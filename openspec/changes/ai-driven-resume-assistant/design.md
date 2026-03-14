## Context

The goal is to build an AI-driven Resume Assistant that can ingest existing resumes and/or structured career inputs, analyze one or more target job postings, and then propose targeted edits to the resume while preserving a structured internal data model and producing ATS-friendly exports. The system must support multiple resume variants per user, generate Markdown resumes that are readable by both humans and downstream ATS/AI systems, and provide clear explanations for every change so users can make informed decisions about which edits to accept.

## Goals / Non-Goals

**Goals:**
- Provide a robust resume intake pipeline that can parse existing resumes or accept structured inputs and normalize them into an internal Resume AST representation.
- Support ingestion and analysis of one or more job postings to extract skills, responsibilities, and keywords in a structured way.
- Implement an alignment engine that proposes strategic edits (additions, rewrites, reordering, and pruning) to the internal Resume AST to better match target jobs while preserving factual accuracy and formatting constraints.
- Maintain strict internal AST compatibility so downstream tooling that consumes the resume structure does not break.
- Generate ATS-conscious Markdown exports that use simple headings, bullet lists, and consistent date formats so that common ATS parsers and LLMs can reliably extract structure.
- Generate human-readable diffs and rationales that explain what changed and why, tied back to job requirements.
- Allow users to create and manage multiple role-specific resume variants derived from the same core profile.

**Non-Goals:**
- Implement a fully-fledged applicant tracking system (ATS) or job application manager.
- Provide general-purpose document editing unrelated to resumes (e.g., cover letters).
- Replace human judgment about truthful representation of experience; the system will assume provided inputs are accurate.
- Implement non-resume career tools such as interview practice or salary negotiation guidance.

## Decisions

- Use a canonical Resume AST schema as the core data model and source of truth, with adapters for import/export from various formats (e.g., JSON, YAML, markdown with frontmatter, possibly PDF/Docx via external parsing services).
- Represent job postings in a structured `JobProfile` model that captures role metadata, required and preferred skills, responsibilities, and important keywords/phrases.
- Implement a modular pipeline with stages: Intake → Normalization → Analysis → Alignment → Explanation → Variant Persistence.
- Leverage an LLM for semantic analysis and editing suggestions, constrained by explicit schema guards that ensure outputs are validated and converted back into the Resume AST before being persisted.
- Implement an alignment scoring component that rates how well a resume (or section/bullet) maps to a given job profile, to guide which edits are most valuable.
- Expose the assistant via a primary interaction surface (CLI, web UI, or editor plugin) that sends structured requests (resume data, job descriptions, configuration) to a backend service or local engine.
- Define a Markdown export layer that renders the Resume AST into a plain, ATS-friendly layout with:
  - Clear section headings (e.g., Experience, Education, Skills, Projects, Certifications).
  - Chronological ordering and consistent, parser-friendly date formats.
  - Simple bullet lists for achievements and responsibilities, avoiding complex layout constructs such as tables or multi-column formatting.

## Risks / Trade-offs

- Reliance on LLMs introduces variability; we mitigate this by validating generated content against the Resume AST schema and applying conservative, minimal edits.
- Parsing arbitrary resume formats (especially PDFs and Word documents) can be noisy; for MVP we may restrict to structured formats (JSON/YAML/markdown) and treat PDF/Docx parsing as best-effort with clear user-facing caveats.
- Over-optimization toward keywords could lead to resumes that feel unnatural or bloated; we will enforce length and readability constraints and prefer rephrasing over keyword stuffing.
- Managing multiple variants adds complexity in storage and UX; we will model variants as lightweight diffs or separate AST instances linked to a shared base profile, and start with a simple list-based management UI.
