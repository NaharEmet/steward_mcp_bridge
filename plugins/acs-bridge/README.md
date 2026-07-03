# MCP ACS Bridge

Bridge to connect Claude (web/desktop) to a remote Steward ACS server.

## Install via GitHub (Claude plugin marketplace)

In Claude → Settings → Plugins → Add marketplace, use:

**Owner/repo**: `NaharEmet/steward_mcp_bridge`

Or the full URL: `https://github.com/NaharEmet/steward_mcp_bridge`

Then install the `acs-bridge` plugin and set environment variables:

- `MCP_API_KEY` — your ACS API key (required)
- `ACS_URL` — ACS server URL (optional, defaults to `https://prod.stewardacs.xyz`)

## Local Usage

```bash
MCP_API_KEY=acs_dev_your_key node index.js
```

Or with a custom ACS URL:

```bash
ACS_URL=https://your-server.com MCP_API_KEY=acs_dev_your_key node index.js
```
