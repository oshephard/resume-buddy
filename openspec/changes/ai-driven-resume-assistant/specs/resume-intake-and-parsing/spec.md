## ADDED Requirements

### Requirement: Parse resume into canonical Resume AST
The system SHALL accept a resume in **JSON** conforming to the defined **Resume AST** schema and convert it into a canonical in-memory **Resume AST** representation that preserves all semantically relevant information (sections, entries, bullets, dates, skills, and metadata).

#### Scenario: Successful parsing from JSON
- **WHEN** a user provides a resume as **JSON** matching the expected schema
- **THEN** the system SHALL validate the input against the schema
- **AND** the system SHALL construct a complete **Resume AST** instance representing the resume content
- **AND** the system SHALL report validation errors if required fields are missing or incorrectly typed.

### Requirement: Preserve Resume AST compatibility across operations
The system SHALL ensure that all operations that modify a resume (imports, edits, exports) maintain compatibility such that the resulting representation conforms to the canonical **Resume AST** schema.

#### Scenario: Validating resume after edit pipeline
- **WHEN** an edit pipeline (including AI-generated suggestions) produces a modified resume
- **THEN** the system SHALL validate the modified resume against the canonical **Resume AST** schema
- **AND** the system SHALL reject or roll back changes that would violate that schema
- **AND** the system SHALL surface any validation failures with actionable error messages.

### Requirement: Export resume from Resume AST
The system SHALL support exporting a **Resume AST** as **JSON** (lossless, re-importable equivalent AST) and as **ATS-friendly Markdown** for human reading and typical **ATS** upload flows. **v1:** Markdown export SHALL use simple structure **suitable for typical ATS parsers**; Markdown is **not** required to be a second fully round-tripped canonical interchange format if doing so would compromise ATS simplicity.

#### Scenario: Export to JSON
- **WHEN** a user requests export of a resume as **JSON**
- **THEN** the system SHALL serialize the **Resume AST** without loss of structural detail
- **AND** the output SHALL be re-importable to produce an equivalent **Resume AST** instance.

#### Scenario: Export to Markdown
- **WHEN** a user requests **Markdown** export
- **THEN** the system SHALL render an **ATS-friendly** layout (headings, bullets, consistent dates) from the **Resume AST**
- **AND** the output SHALL be suitable for upload or paste into typical **Applicant Tracking System** workflows.
