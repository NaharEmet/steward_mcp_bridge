# Steward Bridge

Connect Claude (web, desktop, Cowork) and ChatGPT to a remote Steward ACS server.

## Claude — install and configure

1. Claude → **Settings → Plugins → Add marketplace** → `NaharEmet/steward_mcp_bridge`
2. Install **Steward Bridge**
3. **Configure the plugin** (required — keys are not optional):
   - Open **Settings → Plugins → Steward Bridge → Configure**
   - **ACS Server URL**: `https://prod.stewardacs.xyz` (or your own ACS host)
   - **Steward ACS API Key**: your `acs_dev_...` developer key
4. Enable the plugin for your conversation (**+ → Connectors / Plugins**)

If Configure does not appear during install, open the plugin menu and choose **Configure options** before starting a chat.

The plugin includes a **steward-agent** skill that teaches Claude the ACS workflow (`get_present_status` → `claim_work` → work → `release_work`). MCP tools appear under the Steward Bridge connector, not as slash commands.

## Verify connectivity

After configuring, ask Claude to call `connection_diagnostic` or `get_present_status` with `agent_id: "claude"`. If tools are missing, the ACS URL may be unreachable or the API key is wrong.

## ChatGPT (Developer mode)

1. Enable Developer mode
2. **Settings → Apps & Connectors → Create**
3. Auth: **None**
4. URL: `https://prod.stewardacs.xyz/mcp/sse?api_key=acs_dev_YOUR_KEY`  
   (requires `MCP_QUERY_KEY_AUTH=true` on the ACS server)

## Claude Code (manual)

```bash
claude mcp add --transport sse steward-bridge \
  https://prod.stewardacs.xyz/mcp/sse \
  --header "X-Api-Key: acs_dev_YOUR_KEY"
```

## Local stdio bridge (legacy)

For tools that only support stdio MCP:

```bash
MCP_API_KEY=acs_dev_your_key ACS_URL=https://prod.stewardacs.xyz node index.js
```
