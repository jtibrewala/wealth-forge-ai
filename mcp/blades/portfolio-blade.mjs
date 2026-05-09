/**
 * Portfolio Blade: Strategic Investment Intelligence.
 * Leverages FinWorth Math Engine for deep financial planning.
 */

import { retirementCorpus, inflationAdjusted } from "../../skills/finworth-js/dist/index.js";

export class PortfolioBlade {
    constructor() {
        this.tools = [
            {
                name: "generate_fire_roadmap",
                description: "Calculate a complete roadmap for Financial Independence Retire Early (FIRE).",
                inputSchema: {
                    type: "object",
                    properties: {
                        current_age: { type: "number", description: "Your current age." },
                        retirement_age: { type: "number", description: "Target retirement/FI age." },
                        monthly_expense: { type: "number", description: "Current monthly expenses." },
                        existing_corpus: { type: "number", description: "Current value of existing investments.", default: 0 },
                        inflation: { type: "number", description: "Expected annual inflation (e.g., 0.06 for 6%).", default: 0.06 },
                        pre_retirement_return: { type: "number", description: "Expected annual return on investments before retirement.", default: 0.12 },
                        post_retirement_return: { type: "number", description: "Expected annual return on investments after retirement.", default: 0.08 },
                        life_expectancy: { type: "number", description: "Expected life expectancy for corpus planning.", default: 85 }
                    },
                    required: ["current_age", "retirement_age", "monthly_expense"]
                }
            }
        ];
    }

    async execute(toolName, args) {
        if (toolName === "generate_fire_roadmap") {
            const {
                current_age,
                retirement_age,
                monthly_expense,
                existing_corpus = 0,
                inflation = 0.06,
                pre_retirement_return = 0.12,
                post_retirement_return = 0.08,
                life_expectancy = 85
            } = args;

            // 1. Calculate Retirement Stats via FinWorth logic
            // Note: We use the logic from retirementCorpus but customize it for the roadmap
            const stats = retirementCorpus(
                monthly_expense,
                current_age,
                retirement_age,
                life_expectancy,
                inflation,
                post_retirement_return
            );

            // 2. Adjust for existing corpus
            // Future value of existing corpus at retirement
            const years_to_retire = retirement_age - current_age;
            const fv_existing = existing_corpus * Math.pow(1 + pre_retirement_return, years_to_retire);
            
            const net_corpus_needed = Math.max(stats.corpusNeeded - fv_existing, 0);
            
            // 3. Recalculate SIP for the gap
            const r = pre_retirement_return / 12;
            const n = years_to_retire * 12;
            const sip_needed = net_corpus_needed / (((Math.pow(1 + r, n) - 1) / r) * (1 + r));

            // 4. Asset Allocation Recommendation based on age
            let allocation = { equity: "60%", debt: "30%", gold: "10%" };
            if (current_age < 35) allocation = { equity: "75%", debt: "15%", gold: "10%" };
            else if (current_age > 50) allocation = { equity: "40%", debt: "50%", gold: "10%" };

            return {
                summary: `FIRE Roadmap for age ${retirement_age}`,
                retirement_stats: {
                    inflation_adjusted_monthly_expense: `₹${stats.expenseAtRetirement.toLocaleString('en-IN')}`,
                    total_corpus_required: `₹${stats.corpusNeeded.toLocaleString('en-IN')}`,
                    fv_of_existing_investments: `₹${Math.round(fv_existing).toLocaleString('en-IN')}`,
                    net_gap_to_fund: `₹${Math.round(net_corpus_needed).toLocaleString('en-IN')}`
                },
                execution_plan: {
                    monthly_sip_required: `₹${Math.round(sip_needed).toLocaleString('en-IN')}`,
                    recommended_asset_allocation: allocation,
                    assumed_returns: {
                        pre_retirement: `${pre_retirement_return * 100}%`,
                        post_retirement: `${post_retirement_return * 100}%`,
                        inflation: `${inflation * 100}%`
                    }
                },
                milestones: [
                    { age: current_age + Math.round(years_to_retire / 3), status: "Coast FI check" },
                    { age: current_age + Math.round(2 * years_to_retire / 3), status: "Lean FI reached" },
                    { age: retirement_age, status: "Full FIRE achieved" }
                ]
            };
        }
        throw new Error(`Tool ${toolName} not found in Portfolio Blade.`);
    }
}
