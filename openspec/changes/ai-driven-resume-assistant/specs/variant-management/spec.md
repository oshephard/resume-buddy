## ADDED Requirements

### Requirement: Create role-specific resume variants
The system SHALL allow creation of role-specific resume variants derived from a base resume profile and one or more `JobProfile` instances. **v1:** Each variant SHALL be stored as a **full** **Resume AST** (serialized **JSON** in the database), not as a diff against the base.

#### Scenario: Creating a new variant for a job
- **WHEN** a user selects a base resume and a target job posting
- **THEN** the system SHALL create a new resume variant that applies accepted edit suggestions for that job
- **AND** the system SHALL persist a **complete** **Resume AST** for that variant
- **AND** the system SHALL associate the variant with identifiers such as job title, company, and creation timestamp.

### Requirement: List and retrieve variants
The system SHALL support listing and retrieving existing resume variants for a base profile. **v1:** The product is **single-user** (CLI); requirements are per **workspace** or default profile, not multi-tenant accounts.

#### Scenario: Listing variants for a base resume
- **WHEN** a user requests the list of variants associated with a base resume
- **THEN** the system SHALL return metadata for each variant, including name, associated job information (if available), and last modified time.

### Requirement: Keep base profile and variants consistent
The system SHALL maintain a clear relationship between a base resume profile and its variants so changes to the base profile can be propagated or reconciled with existing variants.

#### Scenario: Updating the base resume after variants exist
- **WHEN** a user updates the base resume profile (e.g., to add a new role)
- **THEN** the system SHALL detect which variants are affected
- **AND** the system SHALL either propose updated variants or flag conflicts that require user review, while preserving variant integrity and traceability.
