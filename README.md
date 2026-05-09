# FinForge AI 🚀

**FinForge AI** is a precision-engineered agentic workforce for personal finance. It provides fiduciary-grade financial strategy, tax optimization, and debt management, specifically tuned for the **Indian** and **US** markets.

Built with a **Unified MCP Hub** architecture, FinForge AI eliminates "AI math hallucinations" by delegating all calculations to a dedicated financial engine.

---

## 💎 Why FinForge AI?

Unlike generic financial assistants, FinForge AI uses a **"Hub & Blade"** model:
- **Unified MCP Hub**: A central orchestration server that manages specialized "Intelligence Blades."
- **Zero-Hallucination Math**: Every SIP, Loan EMI, and Tax Slab is calculated via the [finworth-js](https://github.com/vikisingh23/finworth-js) library.
- **Forensic Auditing**: Specialized agents that calculate the real IRR of insurance policies (LIC/ULIP) and audit GWP plans for hidden caps.
- **Cross-Platform "Injected" Intelligence**: Adopts its full persona and toolset inside **Cursor, Claude Code, Kiro CLI, Cline, and ChatGPT**.

---

## 👥 The Agentic Workforce

| Agent | Specialization | Key Intelligence Blade |
| :--- | :--- | :--- |
| **Lead Planner** | The "CIO" - Master ROADMAP synthesis. | `portfolio_generate_fire_roadmap` |
| **Tax Strategist** | CA-grade optimization (44ADA, HRA, LTCG). | `tax-calculator-python` |
| **Loan Specialist** | Debt Architect (RLLR vs MCLR, Prepayment). | `finworth_emi_amortization` |
| **Policy Analyst** | Forensic Auditor (LIC/ULIP IRR, GWP Audit). | `policy_audit_compliance` |
| **MF Specialist** | Quant Analyst (Overlap, Sortino, Alpha). | `alpha-vantage` / `nse-market` |
| **Budget Agent** | Cashflow Analyst (Live sync with Actual/YNAB). | `actual-budget` sync |
| **Profile Manager** | Data Gatekeeper (Age, City, Salary context). | Secure Context Management |
| **Policy Scout** | Vigilant Analyst (RBI, SEBI, Global News). | `policy_get_circulars` |

---

## 🛠️ Advanced Tech Stack

- **Framework**: Model Context Protocol (MCP) for tool-to-model connectivity.
- **Master Hub**: `mcp/hub.mjs` (Unified server orchestrating pluggable Blades).
- **Math Engine**: `finworth-js` (Local high-precision financial logic).
- **Document Intel**: `@neuraforge/office-mcp` (Reading Insurance PDFs & generating Excel).
- **Live Data**: Alpha Vantage (US Markets) & NSE Market Data (India).

---

## 🚀 Quick Start

### 1. Installation
Clone the repository and run the automated setup:
```bash
git clone https://github.com/vikisingh23/fin-forge-ai.git
cd fin-forge-ai
npm run setup
```

### 2. Plug into your Favorite AI
FinForge AI is platform-agnostic. It will automatically inject its rules into:
- **Cursor IDE**: Just open the folder. It detects `.cursorrules`.
- **Kiro CLI**: Run `kiro chat`. It detects `.kirorules`.
- **Claude Code**: Run `claude`. It detects `CLAUDE.md`.
- **Cline (VS Code)**: It automatically adopts `.clinerules`.
- **ChatGPT**: See `chatgpt-instructions.md` for Custom GPT setup.

---

## 🛡️ Security & Privacy
- **PII Masking**: Agents are hardcoded to never request or store unmasked PAN, Aadhar, or SSNs.
- **Local-First Math**: Financial calculations are performed locally on your machine.
- **Disclosure**: FinForge AI is for informational purposes. Always verify with a registered CA or CFP.

## 📄 License
MIT License. Created by [Vikas Singh](https://github.com/vikisingh23).
