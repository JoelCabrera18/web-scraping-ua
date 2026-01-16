import { scrapOptions as scrapOptionsDegreeProgram } from "./interfaces/scrap-options";
import { CheerioScraper } from "./plugins/cheerio";
import { mkdirSync, writeFileSync } from "fs";

const scrapOptionsDegreeProgram: scrapOptionsDegreeProgram = {
  serviceUrl: "https://www.uartes.edu.ec/sitio/la-universidad/pregrado/",
  generalContainer: ".elementor-element-0396226 .elementor-widget-container",
  aditionalInfoContainer: ".elementor-widget-wrap .elementor-element-populated .elementor-widget-container",
  elementToSearch: ".wp-block-heading",
};
const scrapOptionsGraduateProgram: scrapOptionsDegreeProgram = {
  serviceUrl: "https://www.uartes.edu.ec/sitio/posgrado/",
  generalContainer: ".elementor-element-77d3446 .elementor-element-populated .elementor-widget-container",
  aditionalInfoContainer: ".elementor-widget-wrap .elementor-element-populated .elementor-widget-container",
  elementToSearch: ".wp-block-heading",
};
const scraper = new CheerioScraper();
(async () => {
  console.log("Iniciando Scraping de UArtes");

  const degreeProgram = await scraper.scrapDegreeProgram(scrapOptionsDegreeProgram, true);
  const graduateProgram = await scraper.scrapDegreeProgram(scrapOptionsGraduateProgram, false);

  const response = {
    posgrado: { ...graduateProgram },
    pregrado: { ...degreeProgram },
  };

  // Convertir a JSON con formato legible
  const stringResponse = JSON.stringify(response, null, 2);

  // Guardar en archivo
  mkdirSync("src/docs", { recursive: true });

  writeFileSync("src/docs/degree-response.json", stringResponse, "utf-8");
  console.log("Terminando Scraping de UArtes");
})();
