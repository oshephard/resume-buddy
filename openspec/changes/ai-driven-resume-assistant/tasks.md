## 1. Resume AST and Parsing

- [ ] 1.1 Define canonical Resume AST schema (sections, entries, bullets, metadata).
- [ ] 1.2 Implement schema validation utilities for Resume AST.
- [ ] 1.3 Implement import from structured formats (JSON/YAML/markdown) into Resume AST.
- [ ] 1.4 Integrate or stub document parser for semi-structured formats (PDF/Docx) and map output into Resume AST.
- [ ] 1.5 Implement export from Resume AST to structured formats ensuring round-trip fidelity.

## 2. Job Posting Analysis

- [ ] 2.1 Define `JobProfile` model for job postings (title, company, responsibilities, skills, keywords).
- [ ] 2.2 Implement ingestion of job postings from text/URL into `JobProfile`.
- [ ] 2.3 Implement skill and requirement extraction with importance scoring.
- [ ] 2.4 Distinguish required vs preferred criteria where possible based on posting language.

## 3. Alignment and Edit Suggestions

- [ ] 3.1 Design and implement alignment scoring between Resume AST and `JobProfile`.
- [ ] 3.2 Implement core pipeline to generate targeted edit suggestions (rewrites, additions, reorderings, removals).
- [ ] 3.3 Add constraints engine to enforce length, section ordering, and formatting rules when applying edits.
- [ ] 3.4 Integrate LLM-based components for semantic analysis and suggestion generation, guarded by schema validation.

## 4. Change Explanation and Diffs

- [ ] 4.1 Implement AST diffing between base and edited resumes at section/entry/bullet level.
- [ ] 4.2 Implement human-readable change summaries for each suggested edit, tied to job posting signals.
- [ ] 4.3 Implement selective application of suggested changes based on user or client selections.

## 5. Variant Management

- [ ] 5.1 Design data model linking base resume profiles to variants and associated job profiles.
- [ ] 5.2 Implement creation of new variants from a base resume and accepted suggestions.
- [ ] 5.3 Implement listing and retrieval of variants with relevant metadata.
- [ ] 5.4 Implement strategy for handling base profile updates when variants already exist (e.g., proposing reconciliations).

## 6. Interfaces and Integration

- [ ] 6.1 Define API surface (CLI/HTTP/SDK) for providing resumes, job postings, and configuration.
- [ ] 6.2 Implement primary interaction flow for prompting users for experience, anecdotes, and certifications when no resume is provided.
- [ ] 6.3 Implement endpoints/commands for generating suggestions, viewing diffs, and creating variants.
- [ ] 6.4 Add configuration options for controlling aggressiveness of edits, length constraints, and output formats.
