import type { ResumeAst } from "./types.js";
import { validateResumeAst } from "./validate.js";

export class ResumeAstJsonError extends Error {
  constructor(
    message: string,
    readonly cause?: unknown,
  ) {
    super(message);
    this.name = "ResumeAstJsonError";
  }
}

export class ResumeAstValidationFailedError extends Error {
  constructor(readonly errors: string[]) {
    super(errors.join("\n"));
    this.name = "ResumeAstValidationFailedError";
  }
}

/**
 * Parse a JSON string and return a schema-validated Resume AST.
 */
export function importResumeAstFromJson(
  json: string,
  options?: { schemaPath?: string },
): ResumeAst {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch (e) {
    throw new ResumeAstJsonError("Input is not valid JSON.", e);
  }
  const result = validateResumeAst(parsed, options);
  if (!result.ok) {
    throw new ResumeAstValidationFailedError(result.errors);
  }
  return result.data;
}

/**
 * Serialize Resume AST to JSON for lossless interchange (re-importable).
 */
export function exportResumeAstToJson(
  resume: ResumeAst,
  options?: { pretty?: boolean },
): string {
  const space = options?.pretty === false ? undefined : 2;
  return `${JSON.stringify(resume, null, space)}\n`;
}
