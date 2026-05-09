#!/usr/bin/env node

/**
 * WealthForge AI Setup Utility
 * Modeled after NeuraForge AI's install.mjs
 * Automates workspace initialization, MCP configuration, and platform integration.
 */

import { execSync } from 'child_process';
import { existsSync, writeFileSync, mkdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { os } from 'os';

const PROJECT_ROOT = process.cwd();
const AGENTS_DIR = join(PROJECT_ROOT, 'agents');
const SKILLS_DIR = join(PROJECT_ROOT, 'skills');
const RULES_DIR = join(PROJECT_ROOT, 'rules');

console.log('🚀 Initializing WealthForge AI Agentic Workforce...');

// 0. Install Root Dependencies
console.log('📦 Installing project dependencies...');
try {
    execSync(`npm install --silent`, { stdio: 'inherit' });
} catch (e) {
    console.error('⚠️ Root npm install failed. Some custom MCPs may not work.');
}

// 1. Core Directory Setup
const dirs = ['agents', 'skills', 'rules', 'mcp', 'orchestrator', '.gemini/prompts'];
dirs.forEach(dir => {
    const fullPath = join(PROJECT_ROOT, dir);
    if (!existsSync(fullPath)) {
        mkdirSync(fullPath, { recursive: true });
        console.log(`✅ Created directory: ${dir}`);
    }
});

// 2. Math Engine (FinWorth-JS) Setup
const finworthPath = join(SKILLS_DIR, 'finworth-js');
if (!existsSync(finworthPath)) {
    console.log('📥 Cloning FinWorth Math Engine...');
    try {
        execSync(`git clone https://github.com/vikisingh23/finworth-js.git ${finworthPath}`, { stdio: 'inherit' });
        console.log('📦 Installing FinWorth dependencies...');
        execSync(`cd ${finworthPath} && npm install --silent && npm run build --silent`, { stdio: 'inherit' });
        console.log('✅ FinWorth Math Engine ready.');
    } catch (error) {
        console.error('❌ Failed to setup FinWorth-JS. Please check git/npm permissions.');
    }
}

// 3. MCP Configuration
const mcpConfigPath = join(PROJECT_ROOT, '.mcp.json');
const mcpTemplate = {
    mcpServers: {
        "finworth-math-engine": {
            "command": "node",
            "args": ["skills/finworth-js/bin/mcp-server.js"],
            "env": {},
            "disabled": false
        },
        "wealth-forge-hub": {
            "command": "node",
            "args": ["mcp/hub.mjs"],
            "env": {},
            "disabled": false
        },
        "tax-calculator-python": {
            "command": "python",
            "args": ["skills/calculate_income_tax_india.py"],
            "env": {},
            "disabled": false
        },
        "nse-market-data": {
            "command": "npx",
            "args": ["-y", "@modelcontextprotocol/server-nse-market"],
            "env": {},
            "disabled": false
        },
        "office-mcp": {
            "command": "npx",
            "args": ["-y", "@neuraforge/office-mcp"],
            "env": {},
            "disabled": false
        },
        "alpha-vantage": {
            "command": "npx",
            "args": ["-y", "mcp-server-alphavantage"],
            "env": { "ALPHAVANTAGE_API_KEY": "YOUR_API_KEY_HERE" },
            "disabled": false
        },
        "actual-budget": {
            "command": "npx",
            "args": ["-y", "mcp-server-actual-budget"],
            "env": {
                "ACTUAL_SERVER_URL": "http://localhost:5006",
                "ACTUAL_PASSWORD": "YOUR_PASSWORD_HERE",
                "ACTUAL_SYNC_ID": "YOUR_SYNC_ID_HERE"
            },
            "disabled": false
        }
    }
};

writeFileSync(mcpConfigPath, JSON.stringify(mcpTemplate, null, 2));
console.log('✅ Configured .mcp.json');

// 4. Platform Rules Deployment (Cursor/Claude/ChatGPT)
console.log('🎨 Deploying platform-specific adapters...');

// Cursor
const cursorRulesPath = join(PROJECT_ROOT, '.cursorrules');
if (!existsSync(cursorRulesPath)) {
    const cursorTemplate = `# WealthForge AI Cursor Rules\n- Reference .gemini/prompts/GLOBAL_SYSTEM_RULES.md\n- Use FinWorth Math Engine for all calculations.`;
    writeFileSync(cursorRulesPath, cursorTemplate);
}

// 5. Final Checklist
console.log('\n--- WealthForge AI Ready ---');
console.log('📍 Location: ' + PROJECT_ROOT);
console.log('🤖 Agents: ' + dirs.length);
console.log('📐 Math Engine: Integrated (finworth-js)');
console.log('📄 Documents: Integrated (office-mcp)');
console.log('\nRun "gemini" or open in Cursor to start your financial planning session.');
