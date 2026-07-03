# Steward Bridge

Connect Claude (web, desktop, Cowork) and ChatGPT to a remote Steward ACS server.

ACS already exposes a remote MCP endpoint. This plugin points Claude at that endpoint directly — no local Node process required for web or desktop.

## Claude (web, Cowork, Desktop)

### Plugin marketplace

1. Claude → **Settings → Plugins → Add marketplace**
2. Enter: `NaharEmet/steward_mcp_bridge`
3. Install **Steward Bridge** (`steward-bridge`)
4. Set plugin environment variables:
   - `MCP_API_KEY` — your ACS developer key (`acs_dev_...`, required)
   - `ACS_URL` — optional, defaults to `https://prod.stewardacs.xyz`

### Custom connector (alternative)

Claude → **Customize → Connectors → Add custom connector**

- **URL**: `https://prod.stewardacs.xyz/mcp/sse`
- **Auth**: OAuth (required by Claude web UI today — not yet supported by ACS)

Until ACS adds OAuth, use the plugin marketplace path above (supports `X-Api-Key` via plugin env vars).

## ChatGPT

ChatGPT custom connectors require OAuth for production use. For personal testing in **Developer mode**:

1. Enable Developer mode in ChatGPT settings
2. **Settings → Apps & Connectors → Create**
3. Set **Authentication** to **None**
4. **URL** (include your key):  
   `https://prod.stewardacs.xyz/mcp/sse?api_key=acs_dev_YOUR_KEY`

Requires `MCP_QUERY_KEY_AUTH=true` on the ACS server. Keys in URLs are less secure — use only for testing.

## Claude Code / Desktop (manual MCP)

```bash
claude mcp add --transport sse steward-bridge \
  https://prod.stewardacs.xyz/mcp/sse \
  --header "X-Api-Key: acs_dev_YOUR_KEY"
```

Bearer auth also works:

```bash
claude mcp add --transport sse steward-bridge \
  https://prod.stewardacs.xyz/mcp/sse \
  --header "Authorization: Bearer acs_dev_YOUR_KEY"
```

## Local stdio bridge (legacy)

For environments that only support stdio MCP (some local tools):

```bash
MCP_API_KEY=acs_dev_your_key node index.js
```

Or with a custom ACS URL:

```bash
ACS_URL=https://your-server.com MCP_API_KEY=acs_dev_your_key node index.js
```
