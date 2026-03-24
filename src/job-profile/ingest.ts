import type { JobProfile } from "./types.js";

export class JobPostingPlainTextError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "JobPostingPlainTextError";
  }
}

/**
 * Normalize line endings and outer whitespace for stable storage and hashing.
 */
export function normalizeJobPostingPlainText(text: string): string {
  return text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
}

function provisionalTitleFromPlainText(normalized: string): string {
  const line = normalized
    .split("\n")
    .map((l) => l.trim())
    .find((l) => l.length > 0);
  if (!line) {
    return "Job posting";
  }
  return line.length > 200 ? `${line.slice(0, 197)}...` : line;
}

/**
 * Ingest a single job posting from user-pasted plain text into a `JobProfile` shell.
 * Structured fields stay empty until the analysis pipeline (e.g. LLM) runs (see tasks 2.3+).
 */
export function ingestJobPostingFromPlainText(text: string): JobProfile {
  const sourcePlainText = normalizeJobPostingPlainText(text);
  if (!sourcePlainText.length) {
    throw new JobPostingPlainTextError("Job posting text is empty.");
  }
  return {
    schemaVersion: "1.0.0",
    sourcePlainText,
    title: provisionalTitleFromPlainText(sourcePlainText),
    responsibilities: [],
    skills: [],
    keywords: [],
  };
}

/**
 * Ingest multiple pasted postings as separate profiles (e.g. related roles).
 */
export function ingestJobPostingsFromPlainText(texts: readonly string[]): JobProfile[] {
  return texts.map((t) => ingestJobPostingFromPlainText(t));
}
