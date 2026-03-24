export type {
  JobPostingSkill,
  JobProfile,
  JobRequirementLevel,
} from "./job-profile/types.js";
export {
  ingestJobPostingFromPlainText,
  ingestJobPostingsFromPlainText,
  JobPostingPlainTextError,
  normalizeJobPostingPlainText,
} from "./job-profile/ingest.js";
export {
  formatJobProfileAjvErrors,
  validateJobProfile,
  type ValidateJobProfileResult,
} from "./job-profile/validate.js";
export type {
  ContactBlock,
  ProfileLink,
  ResumeAst,
  ResumeBullet,
  ResumeEntry,
  ResumeMetadata,
  ResumeSection,
  SectionKind,
} from "./resume/types.js";
export {
  exportResumeAstToJson,
  importResumeAstFromJson,
  ResumeAstJsonError,
  ResumeAstValidationFailedError,
} from "./resume/json.js";
export { exportResumeAstToMarkdown } from "./resume/markdown.js";
export {
  formatAjvErrors,
  validateResumeAst,
  type ValidateResumeAstResult,
} from "./resume/validate.js";
