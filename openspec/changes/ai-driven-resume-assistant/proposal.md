## Why

Today's job market expects highly tailored resumes aligned to specific roles, but most candidates either reuse a generic resume or spend excessive time manually rewriting it for each application. Existing AI tools often produce free-form text that breaks structured resume formats, making it hard to maintain consistency and downstream parsing.

## What Changes

- Introduce an AI-driven assistant that can ingest job postings (as pasted text in v1), existing resumes, and structured career inputs (roles, projects, achievements, certifications) to generate targeted resume revisions.
- Allow users to either be interactively prompted for experience details and anecdotes or provide an existing resume as the primary source of truth.
- Analyze one or more job descriptions to surface skills, keywords, and responsibilities **relevant to the role** (via LLM-grounded `JobProfile`), for reflection in the resume.
- Propose strategic, minimal edits to the resume (additions, rewrites, reordering, and pruning) that improve fit with the target role while preserving authenticity and factual accuracy, **without keyword stuffing**.
- Keep a stable **Resume AST** with **JSON** as the **v1-only** canonical structured encoding (storage + interchange) and **ATS-friendly Markdown** as an export for uploads and reading; persist application state in a **database** (local single-user CLI).
- Provide a change log that clearly describes what was changed (and why) so users can review, accept, or reject individual modifications.
- Support multiple target roles or job postings and allow generating and managing multiple optimized resume variants.
- **v1:** **CLI** for a **single user**; **JSON** resume intake/interchange; **pasted job text** only (no URL ingestion); **local in-process** engine; no resume–job **alignment scores**; **edit suggestion order** follows **LLM output order** only; variants stored as **full Resume AST** copies in the DB.

## Capabilities

### New Capabilities
- `resume-intake-and-parsing`: Ingest resumes as **JSON** into a normalized **Resume AST**, validate against the canonical schema, and support **ATS-friendly Markdown** export.
- `job-posting-analysis`: Ingest job postings from pasted text; use an **LLM** (validated `JobProfile` output) to extract skills, responsibilities, and keywords and to judge **relevance to the role**—**no** separate heuristic skill-importance scoring in v1.
- `resume-strategic-editing`: Generate and apply targeted edits to the **Resume AST** to better align with one or more job postings while preserving truthfulness and constraints such as length and formatting; agents must not keyword-stuff (enforcement beyond prompts deferred).
- `change-explanation-and-diffing`: Produce human-readable explanations and diffs of suggested resume edits, including rationales tied back to specific job posting requirements.
- `variant-management`: Manage multiple role-specific resume variants, including storing, naming, and retrieving different optimized versions derived from the same base profile.

### Modified Capabilities
- None (v1 is additive).

## Impact

- New modules for **database** persistence (single-user v1), resume **JSON** parsing, **Resume AST** representation, job posting ingestion (pasted text), **ATS-friendly Markdown** export, and edit targeting (no alignment scoring in v1; LLM ordering only).
- Introduction of an AI orchestration layer to coordinate between intake, analysis, editing, and explanation components.
- Potential new dependencies for NLP/LLM integration, JSON validation, embedded **DB** (e.g. SQLite), and Markdown rendering for export.
- **v1:** CLI for interactive prompting, job posting input (paste), and review of suggested changes and diffs.
- **Database** (e.g. SQLite) for **single-user** persistence: base profile(s), **full-AST** variants, job profiles, and related metadata.
