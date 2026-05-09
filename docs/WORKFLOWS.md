# WealthForge AI: Workflow Deep-Dives 🌊

This document outlines how to efficiently use the WealthForge agentic workforce for complex financial analysis.

---

## 🏎️ Workflow 1: The "Regime Battle" (Tax Optimization)
**Objective**: Determine the mathematically superior tax regime for the current FY.

1.  **Input**: "I earn ₹22 LPA, pay ₹45k rent in Bangalore, and have ₹1.5L in 80C. Old or New?"
2.  **Process**:
    *   `Lead Planner` tasks the `Tax Strategist`.
    *   `Tax Strategist` uses `tax-calculator-python` to compute exact liabilities.
    *   `Tax Strategist` checks for "leaks" (e.g., NPS 80CCD(1B) or 80D).
3.  **Outcome**: A side-by-side comparison table with a clear "Analytical Verdict."

## 🚀 Workflow 2: The "FIRE Roadmap" (Retirement Strategy)
**Objective**: Calculate the corpus needed for Financial Independence.

1.  **Input**: "I am 32, I want to retire at 48. My monthly expense is ₹80k. I have ₹20L in MFs."
2.  **Process**:
    *   `Lead Planner` invokes the `Portfolio Blade`.
    *   `Portfolio Blade` runs `generate_fire_roadmap`.
    *   `MF Specialist` provides the asset allocation tilt (e.g., "70% Equity").
3.  **Outcome**: A month-by-month SIP requirement and a 16-year milestone map.

## 🛡️ Workflow 3: The "Policy Forensic" (Insurance Audit)
**Objective**: Audit an existing LIC or ULIP for real IRR.

1.  **Input**: [Uploads Benefit Illustration PDF] "Is this policy worth keeping?"
2.  **Process**:
    *   `Lead Planner` tasks the `Policy Analyst`.
    *   `Policy Analyst` uses `office-mcp` to read the cashflow table.
    *   `Policy Analyst` uses `finworth_xirr` to find the internal rate of return.
3.  **Outcome**: A report showing the IRR (e.g., 4.5%) vs. the Opportunity Cost of an Index Fund.

---

## 💡 Efficiency Tips for Developers
- **Context is King**: The more data you provide in one go (Age, City, Salary), the fewer "turns" the agent takes.
- **Tool-First**: If you suspect a math error, explicitly tell the agent: *"Use the FinWorth engine to double-check that EMI."*
- **Privacy**: Use the `User Profile Manager` to set your baseline data early in the session; it will persist across the team.
