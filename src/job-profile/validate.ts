import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Ajv2020, type ErrorObject, type ValidateFunction } from "ajv/dist/2020.js";
import formatsModule from "ajv-formats";
import type { JobProfile } from "./types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const addFormats = formatsModule as unknown as (ajv: Ajv2020) => Ajv2020;

function defaultSchemaPath(): string {
  return path.resolve(__dirname, "../../schemas/job-profile-v1.schema.json");
}

let compiled:
  | { validate: ValidateFunction<JobProfile>; schemaPath: string }
  | undefined;

function getValidator(schemaPath: string = defaultSchemaPath()): ValidateFunction<JobProfile> {
  if (compiled?.schemaPath === schemaPath) {
    return compiled.validate;
  }
  const raw = fs.readFileSync(schemaPath, "utf8");
  const schema = JSON.parse(raw) as object;
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  addFormats(ajv);
  const validate = ajv.compile<JobProfile>(schema);
  compiled = { validate, schemaPath };
  return validate;
}

export function formatJobProfileAjvErrors(errors: ErrorObject[] | null | undefined): string[] {
  if (!errors?.length) {
    return ["JobProfile validation failed."];
  }
  return errors.map((e) => {
    const loc = e.instancePath?.length ? e.instancePath : "(root)";
    return `${loc}: ${e.message ?? "invalid"}`;
  });
}

export type ValidateJobProfileResult =
  | { ok: true; data: JobProfile }
  | { ok: false; errors: string[]; ajvErrors: ErrorObject[] | undefined };

/**
 * Validate unknown input against the canonical JobProfile JSON Schema.
 */
export function validateJobProfile(
  input: unknown,
  options?: { schemaPath?: string },
): ValidateJobProfileResult {
  const validate = getValidator(options?.schemaPath);
  if (validate(input)) {
    return { ok: true, data: input };
  }
  const ajvErrors = validate.errors ?? undefined;
  return {
    ok: false,
    errors: formatJobProfileAjvErrors(ajvErrors),
    ajvErrors,
  };
}
