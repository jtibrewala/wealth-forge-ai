import json
import sys

def calculate_tax_new_regime(taxable_income: float) -> float:
    """FY 2025-26 New Regime (Budget 2025). Rebate u/s 87A up to ₹12L taxable."""
    sd = 75000
    income = max(0, taxable_income - sd)
    if income <= 1200000:
        return 0.0
    tax = 0.0
    slabs = [(400000, 0), (400000, 0.05), (400000, 0.10), (400000, 0.15), (400000, 0.20), (400000, 0.25), (float('inf'), 0.30)]
    remaining = income
    for limit, rate in slabs:
        if remaining <= 0:
            break
        chunk = min(remaining, limit)
        tax += chunk * rate
        remaining -= chunk
    return tax * 1.04  # 4% cess

def calculate_tax_old_regime(taxable_income: float, deductions: float) -> float:
    """FY 2025-26 Old Regime (unchanged slabs)."""
    sd = 50000
    income = max(0, taxable_income - sd - deductions)
    tax = 0.0
    if income > 1000000:
        tax += (income - 1000000) * 0.30
        income = 1000000
    if income > 500000:
        tax += (income - 500000) * 0.20
        income = 500000
    if income > 250000:
        tax += (income - 250000) * 0.05
    if taxable_income - sd - deductions <= 500000:
        tax = 0.0
    return tax * 1.04

def handle_message(msg):
    method = msg.get("method")
    id = msg.get("id")
    params = msg.get("params", {})

    if method == "initialize":
        return {
            "jsonrpc": "2.0", "id": id,
            "result": {
                "protocolVersion": "2024-11-05",
                "capabilities": {"tools": {}},
                "serverInfo": {"name": "tax-calculator", "version": "2.0.0"}
            }
        }
    elif method == "tools/list":
        return {
            "jsonrpc": "2.0", "id": id,
            "result": {"tools": [{
                "name": "calculate_tax",
                "description": "Calculate Indian Income Tax (Old vs New) for FY 2025-26",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "income": {"type": "number", "description": "Annual Gross Income"},
                        "deductions": {"type": "number", "description": "Total deductions for Old Regime (80C, 80D, etc.)"}
                    },
                    "required": ["income"]
                }
            }]}
        }
    elif method == "tools/call":
        name = params.get("name")
        args = params.get("arguments", {})
        if name == "calculate_tax":
            income = args.get("income", 0)
            deductions = args.get("deductions", 0)
            tax_new = calculate_tax_new_regime(income)
            tax_old = calculate_tax_old_regime(income, deductions)
            result = {
                "fy": "2025-26",
                "new_regime": round(tax_new, 2),
                "old_regime": round(tax_old, 2),
                "recommendation": "New" if tax_new <= tax_old else "Old",
                "savings": round(abs(tax_new - tax_old), 2),
                "zero_tax_threshold_new": "₹12,75,000 (with SD ₹75K)"
            }
            return {
                "jsonrpc": "2.0", "id": id,
                "result": {"content": [{"type": "text", "text": json.dumps(result)}]}
            }
    return {"jsonrpc": "2.0", "id": id, "result": {}}

def main():
    while True:
        line = sys.stdin.readline()
        if not line:
            break
        try:
            msg = json.loads(line)
            response = handle_message(msg)
            sys.stdout.write(json.dumps(response) + "\n")
            sys.stdout.flush()
        except Exception:
            pass

if __name__ == "__main__":
    main()
