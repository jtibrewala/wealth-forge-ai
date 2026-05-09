# Orchestration Pipeline: The FinForge Workflow

The FinForge Orchestrator manages the interaction between the specialized agents to provide a cohesive financial strategy.

## 8-Stage Financial Analysis Pipeline

1.  **Intake & Masking**: The user query is received. Any PII (PAN, Account Numbers) is masked according to `rules/DATA_PRIVACY.md`.
2.  **Context Routing**: The orchestrator identifies which agents are needed.
    - *Example*: "Should I invest in NPS or a Mutual Fund?" -> Routes to **Tax Strategist** (for 80CCD vs 80C) and **Wealth Manager** (for risk/returns).
3.  **Policy Pulse**: The **Policy Scout** is queried for any recent regulatory changes that might affect the decision (e.g., "Any changes in NPS withdrawal rules in the last budget?").
4.  **Data Retrieval (Skills/MCP)**: Agents use the `skills/` or `mcp/` tools to fetch market data or perform calculations.
5.  **Drafting - Specialized Agents**:
    - **Tax Strategist** provides the tax-efficient path.
    - **Wealth Manager** provides the growth-oriented path.
6.  **Synthesis**: The Orchestrator merges the inputs. If there's a conflict (e.g., Tax agent wants a lock-in product, but Budget agent says the user needs liquidity), the Orchestrator highlights the trade-off.
7.  **Safety & Compliance Check**: The final output is checked against `rules/FINANCIAL_DISCLAIMER.md`.
8.  **Delivery**: The final advice is delivered with clear disclaimers and action items.

## Collaboration Patterns

### The "Tax-Efficient Growth" Loop
- **Trigger**: Investment queries.
- **Participants**: Wealth Manager (Lead), Tax Strategist (Reviewer).
- **Goal**: Maximize post-tax returns.

### The "Emergency Rescue" Loop
- **Trigger**: Debt or low savings queries.
- **Participants**: Budget Agent (Lead), Policy Scout (for interest rate trends).
- **Goal**: Restore financial stability.
