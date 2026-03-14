## ADDED Requirements

### Requirement: Produce human-readable change summaries
The system SHALL produce human-readable summaries that describe each proposed resume edit, including what changed and why, using non-technical language suitable for end users.

#### Scenario: Explaining a bullet rewrite
- **WHEN** the system proposes rewriting an existing resume bullet
- **THEN** the system SHALL generate a short explanation that states the original text, the new text, and the rationale (e.g., aligning with a specific requirement or keyword in the job posting).

### Requirement: Provide structured diffs for AST changes
The system SHALL compute structured diffs between the original and edited Resume ASTs so that changes can be programmatically inspected, tracked, and selectively applied.

#### Scenario: Diffing two resume variants
- **WHEN** a user compares a base resume with an edited variant
- **THEN** the system SHALL produce a structured diff that identifies added, removed, and modified nodes at section, entry, and bullet levels
- **AND** the system SHALL expose this diff in a format that can be rendered as both a visual diff and a machine-readable change set.

### Requirement: Support selective acceptance of changes
The system SHALL allow users (or calling clients) to accept or reject proposed changes at a granular level (e.g., per bullet or per section) based on the explanations and diffs.

#### Scenario: Applying a subset of suggestions
- **WHEN** a user chooses to accept only some of the proposed edits
- **THEN** the system SHALL apply only the selected changes to the Resume AST
- **AND** the system SHALL ensure that the resulting AST remains valid and consistent with the canonical schema.
