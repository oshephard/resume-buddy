## 1. Resume AST and Parsing

- [x] 1.1 Define canonical Resume AST schema (sections, entries, bullets, metadata).
- [x] 1.2 Implement schema validation utilities for Resume AST.
- [x] 1.3 Implement import from **JSON** into Resume AST with schema validation.
- [x] 1.4 Implement export: **JSON** (lossless round-trip) and **ATS-friendly Markdown** (export for humans/ATS uploads; not a second canonical interchange format in v1).

## 2. Job Posting Analysis

- [x] 2.1 Define `JobProfile` model for job postings (title, company, responsibilities, skills, keywords).
- [x] 2.2 Implement ingestion of job postings from **pasted plain text** into `JobProfile` (v1: no URL fetch).
- [ ] 2.3 Implement skill and requirement extraction via **LLM** into schema-validated `JobProfile` (determine relevance to the role from the posting; **no** heuristic importance scoring in v1).
- [ ] 2.4 When present in `JobProfile` output, carry **required vs preferred** (or equivalent) as **LLM interpretation** of the posting—not a separate rules engine.

## 3. Targeting and Edit Suggestions

- [ ] 3.1 Implement core pipeline to generate targeted edit suggestions (rewrites, additions, reorderings, removals) without resume–job alignment scores in v1; **preserve LLM output order** with no separate ranking pass.
- [ ] 3.2 Add constraints engine to enforce length, section ordering, and formatting rules when applying edits.
- [ ] 3.3 Integrate LLM-based components for semantic analysis and suggestion generation, guarded by schema validation, with agent instructions forbidding keyword stuffing (automated checks deferred).

## 4. Change Explanation and Diffs

- [ ] 4.1 Implement structured diffing between base and edited resumes at section/entry/bullet level (Resume AST).
- [ ] 4.2 Implement human-readable change summaries for each suggested edit, tied to job posting signals.
- [ ] 4.3 Implement selective application of suggested changes based on user or client selections.

## 5. Persistence and Variant Management

- [ ] 5.1 Design **database** schema (e.g. SQLite) for single-user v1: base resume profile(s), **full Resume AST** JSON per variant, `JobProfile` blobs, metadata, and CLI/session linkage as needed.
- [ ] 5.2 Implement creation of new variants from a base resume and accepted suggestions.
- [ ] 5.3 Implement listing and retrieval of variants with relevant metadata.
- [ ] 5.4 Implement strategy for handling base profile updates when variants already exist (e.g., proposing reconciliations).

## 6. Interfaces and Integration

- [ ] 6.1 Define **v1 CLI** + **local in-process** engine API for resumes (JSON), pasted job postings, DB-backed state, and configuration (no required HTTP service; HTTP/SDK optional later).
- [ ] 6.2 Implement primary interaction flow for prompting users for experience, anecdotes, and certifications when no resume is provided.
- [ ] 6.3 Implement commands for generating suggestions, viewing diffs, and creating variants.
- [ ] 6.4 Add configuration options for controlling aggressiveness of edits, length constraints, and output formats.
