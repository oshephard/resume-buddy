## ADDED Requirements

### Requirement: Ingest job postings into structured JobProfile
The system SHALL ingest one or more job postings and construct a structured `JobProfile` representation that captures core details such as title, level, location, responsibilities, skills, tools, and key phrases relevant to the role.

#### Scenario: Parsing single job posting from pasted text
- **WHEN** a user provides a single job posting as **pasted plain text** (v1: no URL fetch or scrape)
- **THEN** the system SHALL extract and store the posting text
- **AND** the system SHALL derive a `JobProfile` instance with populated title, company (if available), responsibilities, and skills or requirements as produced by the analysis pipeline.

#### Scenario: Parsing multiple job postings
- **WHEN** a user provides multiple job postings for related roles (each as pasted plain text)
- **THEN** the system SHALL construct a `JobProfile` for each posting
- **AND** the system SHALL maintain a collection of profiles for use in downstream targeting and edit operations.

### Requirement: Skill and requirement relevance via LLM
The system SHALL identify skills, tools, and responsibilities mentioned in a job posting and SHALL rely on an **LLM**, with **schema-validated** `JobProfile` output, to judge **what is relevant to that role** given the posting text. **v1:** There SHALL be **no** heuristic **importance scores** (e.g. frequency- or position-based ranking); relevance is whatever the structured LLM output encodes (ordering, grouping, free-text notes, required/preferred labels, etc.) within the `JobProfile` schema.

#### Scenario: LLM-driven relevance in JobProfile
- **WHEN** a `JobProfile` is created from a job posting
- **THEN** the system SHALL populate skills, tools, and related requirements from LLM analysis of the posting
- **AND** the system SHALL **not** assign separate numeric **importance** or **rank** fields from a non-LLM scoring layer in v1.

#### Scenario: Required vs preferred as model output
- **WHEN** the analysis produces distinctions such as required vs preferred (or equivalent) for skills or criteria
- **THEN** those distinctions SHALL reflect **LLM interpretation** of the posting language
- **AND** the system SHALL expose them in `JobProfile` for downstream edit targeting.
