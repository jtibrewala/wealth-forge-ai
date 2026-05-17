/**
 * Math Blade: XIRR, SIP Projection, and Step-Up SIP calculations.
 * Deterministic financial math — no LLM hallucination on numbers.
 */

export class MathBlade {
    constructor() {
        this.tools = [
            {
                name: "calculate_xirr",
                description: "Calculate XIRR (annualized return) from a series of cash flows with dates.",
                inputSchema: {
                    type: "object",
                    properties: {
                        cashflows: {
                            type: "array",
                            description: "Array of {date: 'YYYY-MM-DD', amount: number}. Negative=investment, positive=redemption/current value.",
                            items: {
                                type: "object",
                                properties: {
                                    date: { type: "string" },
                                    amount: { type: "number" }
                                },
                                required: ["date", "amount"]
                            }
                        }
                    },
                    required: ["cashflows"]
                }
            },
            {
                name: "sip_projection",
                description: "Project future value of SIP with optional annual step-up.",
                inputSchema: {
                    type: "object",
                    properties: {
                        monthly_sip: { type: "number", description: "Current monthly SIP amount" },
                        years: { type: "number", description: "Investment horizon in years" },
                        cagr: { type: "number", description: "Expected CAGR (e.g., 0.12 for 12%)", default: 0.12 },
                        step_up: { type: "number", description: "Annual SIP increase % (e.g., 0.15 for 15%)", default: 0 }
                    },
                    required: ["monthly_sip", "years"]
                }
            },
            {
                name: "ltcg_harvest_calc",
                description: "Calculate units to sell for tax-free LTCG harvesting within ₹1.25L limit.",
                inputSchema: {
                    type: "object",
                    properties: {
                        holdings: {
                            type: "array",
                            description: "Array of {scheme, units, avg_nav, current_nav, holding_months}",
                            items: {
                                type: "object",
                                properties: {
                                    scheme: { type: "string" },
                                    units: { type: "number" },
                                    avg_nav: { type: "number" },
                                    current_nav: { type: "number" },
                                    holding_months: { type: "number" }
                                },
                                required: ["scheme", "units", "avg_nav", "current_nav", "holding_months"]
                            }
                        },
                        already_booked: { type: "number", description: "LTCG already booked this FY", default: 0 }
                    },
                    required: ["holdings"]
                }
            }
        ];
    }

    async execute(toolName, args) {
        if (toolName === "calculate_xirr") return this._xirr(args.cashflows);
        if (toolName === "sip_projection") return this._sipProjection(args);
        if (toolName === "ltcg_harvest_calc") return this._ltcgHarvest(args);
        throw new Error(`Tool ${toolName} not found in Math Blade.`);
    }

    _xirr(cashflows) {
        const cfs = cashflows.map(cf => ({
            date: new Date(cf.date),
            amount: cf.amount
        }));
        const d0 = cfs[0].date;
        const years = cfs.map(cf => (cf.date - d0) / (365.25 * 86400000));
        const amounts = cfs.map(cf => cf.amount);

        const npv = (rate) => amounts.reduce((sum, a, i) => sum + a / Math.pow(1 + rate, years[i]), 0);

        // Brent's method
        let lo = -0.99, hi = 10.0;
        for (let i = 0; i < 100; i++) {
            const mid = (lo + hi) / 2;
            if (npv(mid) > 0) lo = mid;
            else hi = mid;
            if (Math.abs(hi - lo) < 1e-8) break;
        }
        const rate = (lo + hi) / 2;
        return { xirr: +(rate * 100).toFixed(2), xirr_decimal: +rate.toFixed(6) };
    }

    _sipProjection({ monthly_sip, years, cagr = 0.12, step_up = 0 }) {
        const r = cagr / 12;
        let total_invested = 0;
        let corpus = 0;
        let current_sip = monthly_sip;

        for (let y = 0; y < years; y++) {
            for (let m = 0; m < 12; m++) {
                corpus = (corpus + current_sip) * (1 + r);
                total_invested += current_sip;
            }
            current_sip = Math.round(current_sip * (1 + step_up));
        }

        return {
            final_corpus: `₹${Math.round(corpus).toLocaleString('en-IN')}`,
            total_invested: `₹${Math.round(total_invested).toLocaleString('en-IN')}`,
            wealth_gain: `₹${Math.round(corpus - total_invested).toLocaleString('en-IN')}`,
            final_monthly_sip: `₹${current_sip.toLocaleString('en-IN')}`,
            cagr_used: `${cagr * 100}%`,
            step_up_used: `${step_up * 100}%`
        };
    }

    _ltcgHarvest({ holdings, already_booked = 0 }) {
        const limit = 125000;
        const remaining = limit - already_booked;
        if (remaining <= 0) return { message: "LTCG exemption fully utilized this FY.", plan: [] };

        // Filter LTCG-eligible (held >12 months) and sort by gain per unit desc
        const eligible = holdings
            .filter(h => h.holding_months > 12 && h.current_nav > h.avg_nav)
            .map(h => ({
                ...h,
                gain_per_unit: h.current_nav - h.avg_nav,
                total_unrealized: (h.current_nav - h.avg_nav) * h.units
            }))
            .sort((a, b) => b.total_unrealized - a.total_unrealized);

        let budget = remaining;
        const plan = [];

        for (const h of eligible) {
            if (budget <= 0) break;
            const gain_needed = Math.min(budget, h.total_unrealized);
            const units_to_sell = +(gain_needed / h.gain_per_unit).toFixed(3);
            const actual_gain = +(units_to_sell * h.gain_per_unit).toFixed(0);
            plan.push({
                scheme: h.scheme,
                units_to_sell,
                gain_realized: actual_gain,
                holding_months: h.holding_months
            });
            budget -= actual_gain;
        }

        const total_gain = plan.reduce((s, p) => s + p.gain_realized, 0);
        return {
            exemption_limit: limit,
            already_booked,
            remaining_before: remaining,
            plan,
            total_gain_to_book: total_gain,
            tax_saved: Math.round(total_gain * 0.125),
            status: total_gain <= remaining ? "✅ Within limit" : "⚠️ Exceeds limit"
        };
    }
}
