import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Ajv2020, type ErrorObject, type ValidateFunction } from "ajv/dist/2020.js";
import formatsModule from "ajv-formats";
import type { ResumeAst } from "./types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const addFormats = formatsModule as unknown as (ajv: Ajv2020) => Ajv2020;

function defaultSchemaPath(): string {
  return path.resolve(__dirname, "../../schemas/resume-ast-v1.schema.json");
}

let compiled:
  | { validate: ValidateFunction<ResumeAst>; schemaPath: string }
  | undefined;

function getValidator(schemaPath: string = defaultSchemaPath()): ValidateFunction<ResumeAst> {
  if (compiled?.schemaPath === schemaPath) {
    return compiled.validate;
  }
  const raw = fs.readFileSync(schemaPath, "utf8");
  const schema = JSON.parse(raw) as object;
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  addFormats(ajv);
  const validate = ajv.compile<ResumeAst>(schema);
  compiled = { validate, schemaPath };
  return validate;
}

export function formatAjvErrors(errors: ErrorObject[] | null | undefined): string[] {
  if (!errors?.length) {
    return ["Resume AST validation failed."];
  }
  return errors.map((e) => {
    const loc = e.instancePath?.length ? e.instancePath : "(root)";
    return `${loc}: ${e.message ?? "invalid"}`;
  });
}

export type ValidateResumeAstResult =
  | { ok: true; data: ResumeAst }
  | { ok: false; errors: string[]; ajvErrors: ErrorObject[] | undefined };

/**
 * Validate unknown input against the canonical Resume AST JSON Schema.
 */
export function validateResumeAst(
  input: unknown,
  options?: { schemaPath?: string },
): ValidateResumeAstResult {
  const validate = getValidator(options?.schemaPath);
  if (validate(input)) {
    return { ok: true, data: input };
  }
  const ajvErrors = validate.errors ?? undefined;
  return {
    ok: false,
    errors: formatAjvErrors(ajvErrors),
    ajvErrors,
  };
}
