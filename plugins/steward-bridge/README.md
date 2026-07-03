# Steward Bridge

Connect Claude to Steward ACS.

## Important: Plugins vs Custom Connectors

Claude has **two different** integration paths:

| Path | Where | API key support |
|------|--------|-----------------|
| **Plugins** | Settings → **Plugins** | ✅ Configure options prompt for key + URL |
| **Custom Connectors** | Settings → **Connectors** | ❌ OAuth only — **no field to paste a key** |

If you need to enter an `acs_dev_...` key, use **Plugins**, not Custom Connectors.

---

## Option A — Plugin marketplace (recommended)

1. **Settings → Plugins → Add marketplace** → `NaharEmet/steward_mcp_bridge`
2. Install **Steward Bridge**
3. **Settings → Plugins → Steward Bridge → Configure** (or **Configure options** from the plugin menu)
   - **ACS Server URL:** `https://prod.stewardacs.xyz`
   - **Steward ACS API Key:** your `acs_dev_...` key
4. Enable in chat: **+ → Plugins** → toggle Steward Bridge

Includes the **steward-agent** skill and remote SSE MCP tools.

---

## Option B — Custom Connector (key in URL)

Use this only if you prefer Connectors over Plugins. Claude cannot send headers, so the key goes in the URL.

**Requires** `MCP_QUERY_KEY_AUTH=true` on the ACS server (enabled by default in `docker-compose.cloudflare.yml`).

1. **Settings → Connectors → + → Add custom connector**
2. **URL** (replace with your real key):

   ```
   https://prod.stewardacs.xyz/mcp/sse?api_key=acs_dev_YOUR_KEY_HERE
   ```

3. **Authentication:** None  
   (Do not use OAuth — ACS does not implement OAuth yet)

The MCP endpoint path is **`/mcp/sse`**, not the bare domain.

---

## Stack

Steward ACS is **Elixir/Phoenix**. MCP routes:

- `GET /mcp/sse` — SSE stream (Claude connects here)
- `POST /mcp/messages?session_id=...` — JSON-RPC (used automatically after SSE connect)
- `GET /mcp/health` — health check (no auth)

Auth accepts `X-Api-Key`, `Authorization: Bearer acs_dev_...`, or `?api_key=` when query auth is enabled.

## Claude Code (CLI)

```bash
claude mcp add --transport sse steward-bridge \
  https://prod.stewardacs.xyz/mcp/sse \
  --header "X-Api-Key: acs_dev_YOUR_KEY"
```
