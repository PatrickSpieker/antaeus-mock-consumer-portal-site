# Agent instructions

## Internal MCP

The Antaeus internal MCP server (`internal_mcp`) is available for development tasks. Proactively discover its tools and prefer them over manual SQL, scripts, browser workflows, or asking the user when they support the task.

- Use it for database/schema inspection, test accounts and sandbox setup, FHIR developer credentials, invite codes, TEFCA incidents, UI flow reports, and production promotion workflows.
- Discover tools by the `mcp__internal_mcp__` prefix and read their current descriptions and schemas before use. Use `hello_world` when a connectivity check is needed.
- Follow each tool's environment, preview, version, idempotency, and status requirements. Keep credentials out of chat and repository files; use mutations only within the user's authorized scope.
- If the server is unavailable or lacks the needed capability, use the appropriate fallback.
