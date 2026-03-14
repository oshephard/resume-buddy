## Why

Today's job market expects highly tailored resumes aligned to specific roles, but most candidates either reuse a generic resume or spend excessive time manually rewriting it for each application. Existing AI tools often produce free-form text that breaks structured resume formats, making it hard to maintain consistency and downstream parsing.

## What Changes

- Introduce an AI-driven assistant that can ingest job postings, existing resumes, and structured career inputs (roles, projects, achievements, certifications) to generate targeted resume revisions.
- Allow users to either be interactively prompted for experience details and anecdotes or provide an existing resume as the primary source of truth.
- Analyze one or more job descriptions to infer priority skills, keywords, and responsibilities that should be reflected in the resume.
- Propose strategic, minimal edits to the resume (additions, rewrites, reordering, and pruning) that maximize alignment with the target role while preserving authenticity and factual accuracy.
- Maintain AST-compatible resume formatting so downstream tools or pipelines that rely on structured formats (e.g., JSON, YAML, or markdown frontmatter) remain stable.
- Provide a change log that clearly describes what was changed (and why) so users can review, accept, or reject individual modifications.
- Support multiple target roles or job postings and allow generating and managing multiple optimized resume variants.

## Capabilities

### New Capabilities
- `resume-intake-and-parsing`: Ingest existing resumes and structured user input, parse them into a normalized AST representation, and validate that formatting is structurally sound.
- `job-posting-analysis`: Ingest job postings, extract and rank required and preferred skills, responsibilities, and keywords, and represent them in a structured form.
- `resume-strategic-editing`: Generate and apply targeted edits to the resume AST to better align with one or more job postings while preserving truthfulness and constraints such as length and formatting.
- `change-explanation-and-diffing`: Produce human-readable explanations and diffs of suggested resume edits, including rationales tied back to specific job posting requirements.
- `variant-management`: Manage multiple role-specific resume variants, including storing, naming, and retrieving different optimized versions derived from the same base profile.

### Modified Capabilities
- `<existing-name>`: <what requirement is changing>

## Impact

- New APIs and/or internal modules for resume parsing, AST representation, job posting ingestion, and alignment scoring.
- Introduction of an AI orchestration layer to coordinate between intake, analysis, editing, and explanation components.
- Potential new dependencies for NLP/LLM integration and structured document parsing.
- Updates to any existing UI/CLI surfaces to support interactive prompting, job posting input, and review of suggested changes and diffs.
- Storage or configuration changes to support multiple resume variants and persistent user profiles.
