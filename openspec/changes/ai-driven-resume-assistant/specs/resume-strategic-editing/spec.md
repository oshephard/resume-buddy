## ADDED Requirements

### Requirement: Generate targeted alignment edits
The system SHALL generate targeted edits to a resume that improve alignment with one or more `JobProfile` instances while preserving factual accuracy and the candidate’s voice.

#### Scenario: Suggesting edits for a single job posting
- **WHEN** a user selects a base resume and a single `JobProfile`
- **THEN** the system SHALL analyze the resume against the job’s required and preferred criteria
- **AND** the system SHALL produce an ordered list of proposed edits (e.g., bullet rewrites, section reordering, additions, or removals) suitable for user review
- **AND** **v1** SHALL present edits in **the same order** returned by the LLM, with **no** separate deterministic re-ranking or post-pass reordering
- **AND** v1 SHALL NOT require or expose numeric **alignment benefit scores** per edit or between resume and job (that may be added in a later version).

#### Scenario: Respecting truthfulness constraints
- **WHEN** generating edit suggestions
- **THEN** the system SHALL only propose edits that are logically consistent with the user-provided experience and skills
- **AND** the system SHALL avoid inventing new roles, projects, or achievements that are not supported by provided inputs.

### Requirement: Avoid keyword stuffing
The system SHALL instruct editing agents **not** to keyword-stuff: suggestions SHALL prioritize natural, readable phrasing that reflects real experience and job fit rather than cramming job-posting terms for optimization’s sake. **v1:** Compliance SHALL be achieved through agent prompts and constraints; automated detection and tests are **out of scope** for v1 and may be defined later.

#### Scenario: No gratuitous repetition or list dumping
- **WHEN** the system proposes rewrites or new bullets
- **THEN** the suggestions SHALL not add blocks whose primary purpose is repeating job keywords without substantive achievement content
- **AND** the system SHALL prefer concise rephrasing that mentions relevant concepts where they genuinely apply.

### Requirement: Maintain structural and length constraints
The system SHALL ensure that proposed edits respect configurable constraints such as maximum resume length, section ordering rules, and formatting conventions defined by the **Resume AST**.

#### Scenario: Enforcing length and section rules
- **WHEN** an edit pipeline proposes changes that would exceed configured page/word count or violate section ordering rules
- **THEN** the system SHALL either adjust the proposed edits (e.g., by pruning lower-value bullets) or flag them as non-applicable
- **AND** the system SHALL only surface suggested edits that result in a resume satisfying the configured constraints.

### Requirement: Support multiple target roles
The system SHALL support generating and evaluating edit suggestions for multiple `JobProfile` instances derived from different but related roles.

#### Scenario: Role-specific suggestions without alignment scores
- **WHEN** a user selects a base resume and multiple `JobProfile` instances
- **THEN** the system SHALL generate a set of **role-specific** edit suggestions for each profile
- **AND** the system SHALL surface these suggestions in a way that allows users to choose which role to optimize for
- **AND** v1 SHALL NOT require numeric **alignment scores** comparing the resume to each job profile.
