# FinForge AI 🚀

**FinForge AI** is a technical framework for building an **agentic personal finance workforce**. It serves as an architectural showcase for orchestrating multi-agent systems using the **Model Context Protocol (MCP)**, specifically tailored for the Indian and US financial landscapes.

> **⚠️ DISCLOSURE & LIMITATIONS**: This project is for **educational and research purposes only**. It is not a financial advisory service. AI models can hallucinate; always verify calculations and advice with a registered Chartered Accountant (CA) or Certified Financial Planner (CFP). This system does not possess a fiduciary license.

---

## 💎 Architectural Highlights

FinForge AI demonstrates a **"Hub & Blade"** orchestration model designed to solve common LLM limitations in finance:
- **Unified MCP Hub**: A centralized orchestration layer that manages specialized logic modules ("Blades").
- **Tool-Augmented Math**: Mitigates "AI math drift" by delegating all financial formulas to the [finworth-js](https://github.com/vikisingh23/finworth-js) math engine.
- **Context-Injected Personas**: Cross-platform configuration files (`.cursorrules`, `.kirorules`, `CLAUDE.md`) that ensure consistent agent behavior across IDEs and CLIs.
- **Privacy-First Design**: Prompt-level PII masking guidelines to ensure sensitive data (PAN, SSN) is not transmitted to LLM providers.

---

## 👥 The Agentic Research Workforce

These agents are designed to simulate specialized financial reasoning paths:
- **Lead Planner**: Synthesizes multi-agent data into a cohesive analytical roadmap.
- **Tax Strategist**: Simulates tax logic for the FY 2024-25 Indian Finance Act.
- **Loan Specialist**: Analyzes debt structures (RLLR vs MCLR) and prepayment math.
- **Policy Analyst**: Extracts and audits terms from insurance benefit illustrations.
- **MF Specialist**: Analyzes portfolio overlap and risk-adjusted return metrics.

---

## 🛠️ Integrated Tech Stack

- **Framework**: Model Context Protocol (MCP) for tool-to-model connectivity.
- **Master Hub**: `mcp/hub.mjs` (Dynamic tool routing and namespacing).
- **Math Engine**: `finworth-js` (Deterministic local calculations).
- **Automation**: `setup.mjs` (One-command environment initialization).

---

## 🚀 Quick Start (For Developers)

### 1. Initialization
```bash
git clone https://github.com/vikisingh23/fin-forge-ai.git
cd fin-forge-ai
npm run setup
```

### 2. Implementation
Connect the framework to your preferred AI (Cursor, Kiro CLI, Claude, or ChatGPT) using the provided adapter files in the root directory.

---

## 🛡️ Security & Integrity
- **Local-First**: The `finworth` engine runs locally to keep financial math on-device.
- **Extensible**: Designed to allow developers to drop in new "Blades" for different jurisdictions or asset classes.

## 📄 License
MIT License. Created by [Vikas Singh](https://github.com/vikisingh23).
