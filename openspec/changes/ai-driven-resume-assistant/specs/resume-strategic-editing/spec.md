## ADDED Requirements

### Requirement: Generate targeted alignment edits
The system SHALL generate targeted edits to a resume that improve alignment with one or more `JobProfile` instances while preserving factual accuracy and the candidate’s voice.

#### Scenario: Suggesting edits for a single job posting
- **WHEN** a user selects a base resume and a single `JobProfile`
- **THEN** the system SHALL analyze the resume against the job’s required and preferred criteria
- **AND** the system SHALL produce a list of proposed edits (e.g., bullet rewrites, section reordering, additions, or removals) with an associated alignment benefit score for each edit.

#### Scenario: Respecting truthfulness constraints
- **WHEN** generating edit suggestions
- **THEN** the system SHALL only propose edits that are logically consistent with the user-provided experience and skills
- **AND** the system SHALL avoid inventing new roles, projects, or achievements that are not supported by provided inputs.

### Requirement: Maintain structural and length constraints
The system SHALL ensure that proposed edits respect configurable constraints such as maximum resume length, section ordering rules, and formatting conventions defined by the Resume AST.

#### Scenario: Enforcing length and section rules
- **WHEN** an edit pipeline proposes changes that would exceed configured page/word count or violate section ordering rules
- **THEN** the system SHALL either adjust the proposed edits (e.g., by pruning lower-value bullets) or flag them as non-applicable
- **AND** the system SHALL only surface suggested edits that result in a resume satisfying the configured constraints.

### Requirement: Support multiple target roles
The system SHALL support generating and evaluating edit suggestions for multiple `JobProfile` instances derived from different but related roles.

#### Scenario: Comparing alignment across roles
- **WHEN** a user selects a base resume and multiple `JobProfile` instances
- **THEN** the system SHALL compute an alignment score between the resume and each job profile
- **AND** the system SHALL generate a set of role-specific edit suggestions for each profile
- **AND** the system SHALL surface these suggestions in a way that allows users to choose which role to optimize for.
