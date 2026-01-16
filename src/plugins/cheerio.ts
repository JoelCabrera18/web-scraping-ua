import * as cheerio from "cheerio";
import axios from "axios";
import { scrapOptions } from "../interfaces/scrap-options";
import { AditionalInfo, DegreeProgram } from "../interfaces/degree-program";
import { DegreeProgramResponse } from "../interfaces/degree-program-response";

export class CheerioScraper {
  public async scrapDegreeProgram(option: scrapOptions, _isDegreeProgram: boolean): Promise<DegreeProgramResponse> {
    const { serviceUrl: url, generalContainer: container } = option;
    const httpOptions = {
      method: "GET",
      headers: {
        Accept: "text/html,application/xhtml+xml",
      },
      timeout: 10000,
    };
    const page = await axios.get(url, httpOptions);

    const $ = cheerio.load(page.data);
    const careers: DegreeProgram[] = [];

    $(container).each((_index, element) => {
      const title = $(element).find(".elementor-image-box-title a").text().trim();
      const degreeLink = $(element).find(".elementor-image-box-title a").attr("href") || "";
      const description = $(element).find(".elementor-image-box-description").text().trim();
      const refImg = $(element).find(".elementor-image-box-img img").attr("src") || "";

      if (title) careers.push({ title, description, refImg, degreeLink });
    });

    for (const program of careers) {
      let aditionalInfo: AditionalInfo[] = await this.getDegreeAditionalInfo(
        program,
        option.aditionalInfoContainer,
        option.elementToSearch
      );
      program.aditionalInfo = aditionalInfo || [];
    }

    const careerResponse: DegreeProgramResponse = {
      careers,
      records: careers.length,
    };

    return careerResponse;
  }

  private async getDegreeAditionalInfo(
    program: DegreeProgram,
    container: string,
    elements: string
  ): Promise<AditionalInfo[]> {
    try {
      const { degreeLink: url } = program;
      const httpOptions = {
        method: "GET",
        headers: {
          Accept: "text/html,application/xhtml+xml",
        },
        timeout: 10000,
      };
      const page = await axios.get(url, httpOptions);
      const $ = cheerio.load(page.data);

      const contents: AditionalInfo[] = [];
      const titles = $(container).find(elements);
      titles.each((_index, element) => {
        const title = $(element).text().trim();
        let content = $(element).next().text().trim();
        if (!content) {
          content = $(element).next().next().text().trim();
          if (!content) {
            content = $(element).next().next().next().text().trim();
          }
        }
        
        contents.push({ title, content });
      });

      return contents;
    } catch (error) {
      return [];
    }
  }
  // private async getDegreeAditionalInfo(program: DegreeProgram, container:string): Promise<AditionalInfo[]> {
  //   try {
  //     const container = ".elementor-widget-wrap .elementor-element-populated .elementor-widget-container";
  //     const { degreeLink: url } = program;
  //     const httpOptions = {
  //       method: "GET",
  //       headers: {
  //         Accept: "text/html,application/xhtml+xml",
  //       },
  //       timeout: 10000,
  //     };
  //     const page = await axios.get(url, httpOptions);

  //     const $ = cheerio.load(page.data);

  //     const contents: AditionalInfo[] = [];

  //     const titles = $(container).find(".wp-block-heading");

  //     titles.each((_index, element) => {
  //       const title = $(element).text().trim();
  //       let content = $(element).next().text().trim();
  //       if (!content) content = $(element).next().next().text().trim();
  //       contents.push({ title, content });
  //     });
  //     return contents;
  //   } catch (error) {
  //     return [];
  //   }
  // }
}
