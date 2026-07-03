#!/usr/bin/env node
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const API_KEY = process.env.MCP_API_KEY;
const ACS_URL = process.env.ACS_URL || "https://prod.stewardacs.xyz";

if (!API_KEY) {
  console.error("MCP_API_KEY environment variable is required");
  process.exit(1);
}

process.stderr.write(`[acs-bridge] Connecting to ${ACS_URL}...\n`);

const acsClient = new Client(
  { name: "acs-bridge", version: "1.0.0" },
  { capabilities: {} }
);

const sseTransport = new SSEClientTransport(
  new URL(`${ACS_URL}/mcp/sse`),
  {
    headers: { "X-Api-Key": API_KEY },
    requestInit: { headers: { "X-Api-Key": API_KEY } },
  }
);

await acsClient.connect(sseTransport);

const { tools } = await acsClient.listTools();
process.stderr.write(`[acs-bridge] Loaded ${tools.length} tools from ACS\n`);

const bridge = new Server(
  { name: "acs-bridge", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

bridge.setRequestHandler(ListToolsRequestSchema, async () => ({ tools }));

bridge.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const result = await acsClient.callTool({ name, arguments: args });
  return result;
});

const transport = new StdioServerTransport();
await bridge.connect(transport);
