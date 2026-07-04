# Steward Bridge

Connect Claude to Steward ACS.

## Important: Plugins vs Custom Connectors

| Path | Where | API key support |
|------|--------|-----------------|
| **Plugins** | Settings → **Capabilities → Plugins** | Configure dialog (`userConfig`) |
| **Custom Connectors** | Settings → **Connectors** | OAuth only — no key field |

Use **Plugins** for `acs_dev_...` keys.

---

## Claude web (claude.ai)

1. **Settings → Capabilities → Plugins**
2. **Add marketplace** → `NaharEmet/steward_mcp_bridge`
3. **Sync**, then install **Steward Bridge** (v1.5.0+)
4. During install you should be prompted for **Steward ACS API Key**
   - If not prompted: click **Steward Bridge → Configure** (or the gear icon)
5. Enter your `acs_dev_...` key. **ACS Server URL** is optional (defaults to prod).
6. In a chat: **+ → Plugins** → enable **Steward Bridge**

If **Configure does not open** (known Claude web bug):

- Remove plugin → re-sync marketplace → reinstall
- Or use the Custom Connector workaround below

---

## Claude Desktop

Same as web: **Settings → Capabilities → Plugins → Steward Bridge → Configure**.

---

## Claude Code (CLI)

Plugin Configure also works via `/plugin → Installed → steward-bridge → Configure options`.

Or add MCP manually (always works):

```bash
claude mcp add --transport sse steward-bridge \
  https://prod.stewardacs.xyz/mcp/sse \
  --header "X-Api-Key: acs_dev_YOUR_KEY"
```

Verify with `/mcp` in a session.

---

## Custom Connector fallback (web only)

If plugin Configure is broken, use **Settings → Connectors**:

```
https://prod.stewardacs.xyz/mcp/sse?api_key=acs_dev_YOUR_KEY
```

Authentication: **None**. Requires `MCP_QUERY_KEY_AUTH=true` on ACS.

---

## MCP endpoints

- `GET /mcp/sse` — SSE stream
- `POST /mcp/messages?session_id=...` — JSON-RPC
- `GET /mcp/health` — health check (no auth)

Auth: `X-Api-Key`, `Authorization: Bearer`, or `?api_key=` when query auth is enabled.
