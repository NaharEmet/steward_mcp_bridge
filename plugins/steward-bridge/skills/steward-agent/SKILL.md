---
description: Coordinate multi-agent work through Steward ACS — claim tasks, lock files, save memories, release work. Use when Steward Bridge MCP tools are available.
---

# Steward ACS agent workflow

Steward Bridge connects you to **Steward ACS** via MCP tools. These are not slash-command skills — call them as MCP tools (e.g. `get_present_status`, `claim_work`).

## Configure first

If tools are missing or auth fails, ask the user to open **Settings → Capabilities → Plugins → Steward Bridge → Configure** and set:

- **Steward ACS API Key** — their `acs_dev_...` key (required)
- **ACS Server URL** — optional; defaults to `https://prod.stewardacs.xyz`

Then call `connection_diagnostic` to verify the server is reachable.

## Every session

1. **`get_present_status`** — pass `agent_id` (e.g. `"claude"`). Confirms ACS is up.
2. **`claim_work`** — pass `agent_id` and `task_id` (or follow ACS guidance). Read the guidance packet in the response before coding.
3. **`help`** — lists all MCP tools if you need a refresher.

## While working

- **`lock_file`** before editing any file path listed on the task.
- **`search_memories`** / **`save_memory`** for project learnings (`scope`, `tags`, `content`).
- **`specs_search`** / **`specs_get`** for module documentation when relevant.
- **`list_tasks`** to see queue status.

## When done

1. **`release_work`** — pass `agent_id`, `task_id`, status, and summary.
2. **`unlock_file`** for any files you locked.
3. **`save_memory`** for durable learnings from this task.

## Tool names (MCP)

Core: `get_present_status`, `claim_work`, `release_work`, `create_work`, `lock_file`, `unlock_file`, `list_tasks`

Memory: `save_memory`, `search_memories`, `list_memories`

Specs: `specs_get`, `specs_search`, `specs_propose`

Diagnostics: `help`, `connection_diagnostic`, `memory_health_check`

Errors: `list_error_traces`, `ack_error_trace`, `resolve_error_trace`

Always prefer MCP tool calls over guessing when coordinating agent work.
