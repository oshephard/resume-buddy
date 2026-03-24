import assert from "node:assert/strict";
import test from "node:test";
import {
  ingestJobPostingFromPlainText,
  ingestJobPostingsFromPlainText,
  JobPostingPlainTextError,
  normalizeJobPostingPlainText,
} from "./ingest.js";
import { validateJobProfile } from "./validate.js";

test("normalizeJobPostingPlainText trims and normalizes newlines", () => {
  assert.equal(
    normalizeJobPostingPlainText("  a\r\nb\rc  \n"),
    "a\nb\nc",
  );
});

test("ingestJobPostingFromPlainText stores text and yields provisional title from first line", () => {
  const profile = ingestJobPostingFromPlainText("\n\nSenior Engineer\n\nDetails here.");
  assert.equal(profile.sourcePlainText, "Senior Engineer\n\nDetails here.");
  assert.equal(profile.title, "Senior Engineer");
  assert.deepEqual(profile.responsibilities, []);
  assert.deepEqual(profile.skills, []);
  assert.deepEqual(profile.keywords, []);
  const v = validateJobProfile(profile);
  assert.equal(v.ok, true);
});

test("ingestJobPostingFromPlainText throws on empty input", () => {
  assert.throws(() => ingestJobPostingFromPlainText("   \n\t  "), JobPostingPlainTextError);
});

test("ingestJobPostingsFromPlainText maps each posting", () => {
  const [a, b] = ingestJobPostingsFromPlainText(["First job\nbody", "Second\njob"]);
  assert.equal(a.title, "First job");
  assert.equal(b.title, "Second");
});

test("validateJobProfile rejects missing sourcePlainText", () => {
  const bad = {
    schemaVersion: "1.0.0",
    title: "x",
    responsibilities: [],
    skills: [],
    keywords: [],
  };
  const result = validateJobProfile(bad);
  assert.equal(result.ok, false);
});
