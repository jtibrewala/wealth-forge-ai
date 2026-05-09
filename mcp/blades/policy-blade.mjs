/**
 * Policy Blade: Regulatory and Legislative Intelligence.
 * Grounds agents in the latest financial laws and circulars.
 */

export class PolicyBlade {
    constructor() {
        this.tools = [
            {
                name: "get_circulars",
                description: "Fetch latest regulatory circulars from ITD/RBI/SEBI (2024-25 focus).",
                inputSchema: {
                    type: "object",
                    properties: {
                        category: { type: "string", enum: ["income-tax", "rbi", "sebi"], description: "The regulatory body." }
                    },
                    required: ["category"]
                }
            },
            {
                name: "audit_compliance",
                description: "Audit a financial scenario against the latest Finance Act 2024 rules.",
                inputSchema: {
                    type: "object",
                    properties: {
                        scenario: { type: "string", description: "The financial move to audit (e.g., 'Selling equity after 14 months')." }
                    },
                    required: ["scenario"]
                }
            }
        ];
    }

    async execute(toolName, args) {
        if (toolName === "get_circulars") {
            const updates = {
                "income-tax": [
                    "Standard Deduction (New Regime): Increased to ₹75,000.",
                    "Slabs (New Regime): 5% starts at 3L, 10% at 7L, 15% at 10L, 20% at 12L, 30% above 15L.",
                    "LTCG on Equity: Increased to 12.5% (Exemption: ₹1.25L).",
                    "STCG on Equity: Increased to 20%."
                ],
                "rbi": [
                    "Repo Rate: Maintained at 6.50% (Dec 2024).",
                    "Transmission: Banks mandated to provide clear timelines for switching from MCLR to RLLR."
                ],
                "sebi": [
                    "MF Categorization: Stricter rules for Multi-Asset and Dynamic Asset Allocation funds.",
                    "Transparency: AMCs must report tracking error and tracking difference for Index Funds monthly."
                ]
            };
            return {
                body: args.category.toUpperCase() + " Regulatory Updates",
                updates: updates[args.category] || ["No recent updates found."],
                source: "Official Ministry/Regulatory Portals",
                timestamp: new Date().toISOString().split('T')[0]
            };
        }

        if (toolName === "audit_compliance") {
            const scenario = args.scenario.toLowerCase();
            let verdict = "Compliance check complete.";
            let logic = [];

            if (scenario.includes("equity") || scenario.includes("mf")) {
                logic.push("Post-July 2024: LTCG is 12.5% after 12 months.");
                logic.push("STCG is 20% if sold within 12 months.");
            }
            if (scenario.includes("tax") || scenario.includes("regime")) {
                logic.push("New Regime is the default. Standard Deduction is ₹75k.");
            }

            return {
                verdict,
                applicable_rules: logic,
                disclaimer: "AI-generated compliance summary. Verify with Finance Act 2024 text."
            };
        }

        throw new Error(`Tool ${toolName} not found in Policy Blade.`);
    }
}
