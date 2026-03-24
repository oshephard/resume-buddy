## Context

The goal is to build an AI-driven Resume Assistant that can ingest existing resumes and/or structured career inputs, analyze one or more target job postings, and then propose targeted edits to the resume while preserving a structured internal data model and producing **ATS-friendly** exports (layouts and formats that typical **ATS**—**Applicant Tracking System**—software can parse). The system must support multiple resume variants (v1: single-user CLI workspace), generate Markdown resumes that are readable by both humans and downstream ATS/AI systems, and provide clear explanations for every change so users can make informed decisions about which edits to accept.

**Terminology:** **Resume AST** is this project’s canonical structured resume model (abstract syntax tree over sections, entries, and bullets). **ATS** always means an **Applicant Tracking System** in the industry sense, not the internal schema name.

## Goals / Non-Goals

**Goals:**
- Provide a robust resume intake pipeline that can parse existing resumes or accept structured inputs and normalize them into an internal **Resume AST** (canonical structured model for reliable interchange and editing).
- **v1:** Use **JSON** as the **only** canonical structured format for resume interchange and persistence (serialized **Resume AST**); job postings from **user-pasted plain text** only (no URL fetch/scrape).
- **v1:** Ship a **CLI** as the primary interaction surface for a **single user** (one identity/workspace per machine context—no multi-tenant accounts); additional UIs can follow in later releases.
- **v1:** Persist profiles, job postings, variants, and metadata in a **database** (e.g. embedded **SQLite** for local CLI); avoid ad-hoc multi-file state unless layered on top of the DB.
- Support ingestion and analysis of one or more job postings to extract skills, responsibilities, and keywords in a structured way.
- Implement an engine that proposes strategic edits (additions, rewrites, reordering, and pruning) to the internal **Resume AST** to better match target jobs while preserving factual accuracy, readability, and formatting constraints.
- Maintain strict **Resume AST** schema compatibility so downstream tooling that consumes the resume structure does not break.
- Generate ATS-conscious Markdown exports that use simple headings, bullet lists, and consistent date formats so that common ATS parsers and LLMs can reliably extract structure.
- Generate human-readable diffs and rationales that explain what changed and why, tied back to job requirements.
- Allow users to create and manage multiple role-specific resume variants derived from the same core profile.
- **v1:** Omit numeric **resume–job alignment scores**; rely on ordered suggestions and rationales instead. **Suggestion order** in v1 is **only** the order produced by the LLM (no separate deterministic ranker or post-pass re-ordering). Scoring may be added later.

**Non-Goals:**
- Implement a full **ATS** (Applicant Tracking System) product—i.e. employer-side hiring software—or a full job application manager.
- Provide general-purpose document editing unrelated to resumes (e.g., cover letters).
- Replace human judgment about truthful representation of experience; the system will assume provided inputs are accurate.
- Implement non-resume career tools such as interview practice or salary negotiation guidance.

## Decisions

- Use a canonical **Resume AST** schema as the core data model and source of truth. **v1:** persist and interchange it as **JSON** only; **Markdown** is an **ATS-friendly export** (human/application upload), not a second canonical structured interchange format. **YAML/markdown-as-source**, **PDF/Docx** intake, and other encodings are out of scope for v1 unless added later as importers into JSON.
- Represent job postings in a structured `JobProfile` model that captures role metadata, skills, responsibilities, and important phrases, with **relevance to the role** judged by an **LLM** from the pasted text—**no** v1 heuristic skill-importance or frequency-based ranking. Required/preferred style distinctions, when present, come from **LLM interpretation** of the posting. **v1:** `JobProfile` is built from **pasted posting text** only (no URL fetch).
- Implement a modular pipeline with stages: Intake → Normalization → Analysis → Targeting (edits toward job fit) → Explanation → Variant Persistence.
- Leverage an LLM for semantic analysis and editing suggestions, constrained by explicit schema guards that ensure outputs are validated and converted back into the **Resume AST** before being persisted.
- Editing agents **SHALL** be instructed not to keyword-stuff: alignment with the job must use natural, readable phrasing; enforcement and automated tests for this are **deferred** beyond prompt-level rules in v1.
- **v1:** Implement a **local, in-process** engine (library + CLI entrypoint)—no required standalone network service. Optional HTTP/SDK may wrap the same core later.
- Define a Markdown export layer that renders the **Resume AST** into a plain, **ATS-friendly** layout (simple typography that typical **ATS** parsers handle well) with:
  - Clear section headings (e.g., Experience, Education, Skills, Projects, Certifications).
  - Chronological ordering and consistent, parser-friendly date formats.
  - Simple bullet lists for achievements and responsibilities, avoiding complex layout constructs such as tables or multi-column formatting.

## Risks / Trade-offs

- Reliance on LLMs introduces variability; we mitigate this by validating generated content against the **Resume AST** schema and applying conservative, minimal edits.
- Over-optimization toward keywords could lead to resumes that feel unnatural or bloated; v1 mitigates this via agent instructions (no keyword stuffing), length/readability constraints, and preferring rephrasing over cramming terminology. Stronger checks can follow.
- Managing multiple variants adds complexity in storage and UX; **v1** stores each variant as a **full copy** of the **Resume AST** (plus metadata linking to base profile and job context), persisted in the database—not as diffs. **v1** exposes variant listing/management through the **CLI** (simple list-oriented commands rather than a graphical UI).
