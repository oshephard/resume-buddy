/**
 * How strongly a skill or criterion applies, when the posting implies it.
 * Populated by LLM interpretation of posting language (not a rules engine); optional when unknown.
 */
export type JobRequirementLevel = "required" | "preferred" | "other";

export type JobPostingSkill = {
  name: string;
  requirementLevel?: JobRequirementLevel;
};

export type JobProfile = {
  schemaVersion: "1.0.0";
  /**
   * Normalized plain text the user pasted (v1: no URL fetch).
   * Preserved for LLM analysis and audit; structured fields may be filled in later pipeline stages.
   */
  sourcePlainText: string;
  /** Role title as stated or inferred from the posting. */
  title: string;
  /** Employer or team name when available. */
  company?: string;
  /** Seniority or level line if present (e.g. Senior, L5). */
  level?: string;
  /** Work location or arrangement when stated. */
  location?: string;
  /** Bullet-style or paragraph responsibilities / duties. */
  responsibilities: string[];
  /** Skills and competencies relevant to the role (ordering is LLM output order; no separate ranker in v1). */
  skills: JobPostingSkill[];
  /** Tools, platforms, or tech named in the posting (optional separate list from skills). */
  tools?: string[];
  /** Salient keywords and phrases for targeting and rationales. */
  keywords: string[];
};
