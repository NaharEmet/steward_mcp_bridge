# MCP ACS Bridge

Bridge to connect Claude (web/desktop) to a remote Steward ACS server.

## Install via GitHub

In Claude settings → MCP Servers, add:

**URL**: `https://github.com/NaharEmet/steward_mcp_bridge`
**Environment**: `MCP_API_KEY=acs_dev_<your-key>`

## Local Usage

```bash
MCP_API_KEY=acs_dev_your_key node index.js
```

Or with a custom ACS URL:

```bash
ACS_URL=https://your-server.com MCP_API_KEY=acs_dev_your_key node index.js
```
