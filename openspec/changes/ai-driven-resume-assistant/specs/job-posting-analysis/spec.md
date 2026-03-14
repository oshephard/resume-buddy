## ADDED Requirements

### Requirement: Ingest job postings into structured JobProfile
The system SHALL ingest one or more job postings and construct a structured `JobProfile` representation that captures core details such as title, level, location, responsibilities, required skills, preferred skills, and key phrases.

#### Scenario: Parsing single job posting
- **WHEN** a user provides a single job posting in plain text or URL form
- **THEN** the system SHALL extract and store the posting text
- **AND** the system SHALL derive a `JobProfile` instance with populated title, company (if available), responsibilities, and categorized skills.

#### Scenario: Parsing multiple job postings
- **WHEN** a user provides multiple job postings for related roles
- **THEN** the system SHALL construct a `JobProfile` for each posting
- **AND** the system SHALL maintain a collection of profiles for use in downstream alignment operations.

### Requirement: Identify and rank skills and requirements
The system SHALL identify skills, tools, and responsibilities mentioned in job postings and rank them by importance to guide resume alignment decisions.

#### Scenario: Extracting skill signals
- **WHEN** a `JobProfile` is created from a job posting
- **THEN** the system SHALL extract a list of skills and tools mentioned in the posting
- **AND** the system SHALL assign each skill a relative importance score based on frequency, position, and surrounding language (e.g., “must have” vs “nice to have”).

#### Scenario: Distinguishing required vs preferred criteria
- **WHEN** analyzing a job posting
- **THEN** the system SHALL categorize each extracted requirement as required or preferred when the posting language supports this distinction
- **AND** the system SHALL expose this categorization to downstream components for prioritizing edits.
