#!/usr/bin/env node

/**
 * WealthForge MCP Hub: The Master Server
 * A unified entry point for all custom financial intelligence.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { BladeRegistry } from "./blades/registry.mjs";

// Import Blades
import { PolicyBlade } from "./blades/policy-blade.mjs";
import { PortfolioBlade } from "./blades/portfolio-blade.mjs";

const registry = new BladeRegistry();

// Initialize and Register Blades
registry.register("policy", new PolicyBlade());
registry.register("portfolio", new PortfolioBlade());

const server = new Server(
  {
    name: "wealth-forge-hub",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: registry.getAllTools(),
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  try {
      const result = await registry.handleCall(name, args);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }],
      };
  } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }],
        isError: true
      };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
