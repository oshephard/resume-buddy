export type SectionKind =
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "awards"
  | "publications"
  | "volunteering"
  | "other";

export type ProfileLink = {
  label: string;
  url: string;
};

export type ContactBlock = {
  emails?: string[];
  phones?: string[];
  location?: string;
  profiles?: ProfileLink[];
};

export type ResumeMetadata = {
  fullName: string;
  headline?: string;
  summary?: string;
  locale?: string;
  contact?: ContactBlock;
};

export type ResumeBullet = {
  id: string;
  text: string;
};

export type ResumeEntry = {
  id: string;
  title?: string;
  organization?: string;
  location?: string;
  startDate?: string;
  endDate?: string | null;
  isCurrent?: boolean;
  bullets: ResumeBullet[];
};

export type ResumeSection = {
  id: string;
  kind: SectionKind;
  title: string;
  entries: ResumeEntry[];
};

export type ResumeAst = {
  schemaVersion: "1.0.0";
  metadata: ResumeMetadata;
  sections: ResumeSection[];
};
