# Steward ACS Bridge

Bridge that connects Claude to a remote Steward ACS server. Provides tools for:

- **Task Lifecycle**: Create, claim, and release work units
- **Knowledge Memory**: Save and search persistent learnings
- **File Locking**: Lock files before editing to prevent conflicts
- **Error Tracking**: Acknowledge and resolve errors
- **Diagnostics**: Health checks and connection diagnostics

## Setup

1. Install via GitHub URL in Claude settings
2. Set `MCP_API_KEY` to your ACS API key
3. Claude will have access to all ACS tools
