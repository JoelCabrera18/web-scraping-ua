export interface DegreeProgram {
  title: string;
  description: string;
  degreeLink: string;
  refImg: string;
  aditionalInfo?: AditionalInfo[];
}

export interface AditionalInfo {
  title: string;
  content: string;
}
