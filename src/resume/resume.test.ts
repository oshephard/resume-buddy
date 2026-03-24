import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import {
  exportResumeAstToJson,
  exportResumeAstToMarkdown,
  importResumeAstFromJson,
} from "../index.js";
import { validateResumeAst } from "./validate.js";

const fixturePath = path.join(
  process.cwd(),
  "src/resume/fixtures/minimal-resume.json",
);

test("validateResumeAst accepts fixture", () => {
  const raw = JSON.parse(readFileSync(fixturePath, "utf8"));
  const result = validateResumeAst(raw);
  assert.equal(result.ok, true);
});

test("import + JSON export round-trip preserves semantics", () => {
  const original = readFileSync(fixturePath, "utf8");
  const ast = importResumeAstFromJson(original);
  const out = exportResumeAstToJson(ast, { pretty: true });
  const again = importResumeAstFromJson(out);
  assert.deepEqual(again, ast);
});

test("importResumeAstFromJson throws on invalid JSON", () => {
  assert.throws(() => importResumeAstFromJson("{"), /valid JSON/i);
});

test("validateResumeAst rejects missing fullName", () => {
  const bad = {
    schemaVersion: "1.0.0",
    metadata: {},
    sections: [],
  };
  const result = validateResumeAst(bad);
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.ok(result.errors.some((e) => e.includes("fullName") || e.includes("metadata")));
  }
});

test("exportResumeAstToMarkdown includes name and section", () => {
  const ast = importResumeAstFromJson(readFileSync(fixturePath, "utf8"));
  const md = exportResumeAstToMarkdown(ast);
  assert.match(md, /# Jane Example/);
  assert.match(md, /## Experience/);
  assert.match(md, /Shipped features/);
});
