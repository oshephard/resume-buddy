## ADDED Requirements

### Requirement: Parse resume into canonical AST
The system SHALL accept a resume in one of the supported input formats and convert it into a canonical Resume AST representation that preserves all semantically relevant information (sections, entries, bullets, dates, skills, and metadata).

#### Scenario: Successful parsing from structured format
- **WHEN** a user provides a resume in a supported structured format (e.g., JSON, YAML, or markdown with defined schema)
- **THEN** the system SHALL validate the input against the expected schema
- **AND** the system SHALL construct a complete Resume AST instance representing the resume content
- **AND** the system SHALL report validation errors if required fields are missing or incorrectly typed.

#### Scenario: Parsing from semi-structured document
- **WHEN** a user uploads a resume as a semi-structured document (e.g., PDF or Word) using a configured parser
- **THEN** the system SHALL invoke the configured parser to extract text and structural hints
- **AND** the system SHALL map the extracted information into the Resume AST as completely as possible
- **AND** the system SHALL record any sections or fields that could not be confidently mapped for later user review.

### Requirement: Preserve AST compatibility across operations
The system SHALL ensure that all operations that modify a resume (imports, edits, exports) maintain AST compatibility such that the resulting representation conforms to the canonical Resume AST schema.

#### Scenario: Validating AST after edit pipeline
- **WHEN** an edit pipeline (including AI-generated suggestions) produces a modified resume
- **THEN** the system SHALL validate the modified resume against the canonical Resume AST schema
- **AND** the system SHALL reject or roll back changes that would make the AST invalid
- **AND** the system SHALL surface any validation failures with actionable error messages.

### Requirement: Export resume from AST
The system SHALL support exporting a Resume AST into one or more configured output formats while preserving structural information needed for future parsing and alignment.

#### Scenario: Export to structured format
- **WHEN** a user requests export of a resume in a structured format (e.g., JSON, YAML, or markdown)
- **THEN** the system SHALL serialize the Resume AST into the chosen format without loss of structural detail
- **AND** the exported representation SHALL be re-importable to produce an equivalent Resume AST instance.
