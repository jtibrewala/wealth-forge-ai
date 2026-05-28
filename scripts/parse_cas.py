"""
CAS PDF parser bridge — reads a CAMS/KFintech/NSDL/CDSL CAS PDF via casparser
and writes structured JSON to stdout. Called by cas-blade.mjs.

Usage:
    python scripts/parse_cas.py --file <path> --password <pwd> [--mode full|summary]
"""

import argparse
import json
import sys
from datetime import date, datetime
from decimal import Decimal

import casparser
from casparser.exceptions import CASParseError


def _serializable(obj):
    """Convert Decimal/date/datetime to JSON-safe types."""
    if isinstance(obj, Decimal):
        return float(obj)
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError(f"Object of type {type(obj)} is not JSON serializable")


def _build_summary(data: dict) -> dict:
    """Compute portfolio-level aggregates from parsed CAS data."""
    total_value = Decimal("0")
    total_invested = Decimal("0")
    category_map: dict[str, dict] = {}
    schemes_flat = []

    for folio in data.get("folios", []):
        amc = folio.get("amc", "Unknown AMC")
        for scheme in folio.get("schemes", []):
            # casparser field names: 'scheme' = name, 'close' = closing units
            name = scheme.get("scheme", "")
            closing_units = Decimal(str(scheme.get("close") or 0))
            asset_type = scheme.get("type", "")  # e.g. EQUITY, DEBT, HYBRID
            valuation = scheme.get("valuation") or {}
            nav = Decimal(str(valuation.get("nav") or 0))
            value = Decimal(str(valuation.get("value") or 0))
            # 'cost' in valuation is the actual invested/cost basis
            invested = Decimal(str(valuation.get("cost") or 0))

            total_value += value
            total_invested += invested

            cat = _infer_category(name, asset_type)
            if cat not in category_map:
                category_map[cat] = {"value": Decimal("0"), "count": 0}
            category_map[cat]["value"] += value
            category_map[cat]["count"] += 1

            schemes_flat.append({
                "amc": amc,
                "folio": folio.get("folio"),
                "scheme": name,
                "isin": scheme.get("isin"),
                "amfi_code": scheme.get("amfi"),
                "asset_type": asset_type,
                "closing_units": float(closing_units),
                "nav": float(nav),
                "value": float(value),
                "invested": float(invested),
                "gain": float(value - invested),
                "category": cat,
                "plan": "Direct" if "direct" in name.lower() else "Regular",
                "transaction_count": len(scheme.get("transactions", [])),
            })

    tv = float(total_value)
    allocation = {
        cat: {
            "value": float(v["value"]),
            "count": v["count"],
            "pct": round(float(v["value"]) / tv * 100, 2) if tv else 0,
        }
        for cat, v in category_map.items()
    }

    return {
        "investor": data.get("investor_info", {}),
        "statement_period": data.get("statement_period", {}),
        "file_type": data.get("file_type", ""),
        "total_value": tv,
        "total_invested": float(total_invested),
        "total_gain": float(total_value - total_invested),
        "scheme_count": len(schemes_flat),
        "folio_count": len(data.get("folios", [])),
        "allocation_by_category": allocation,
        "schemes": schemes_flat,
    }


def _infer_category(name: str, asset_type: str = "") -> str:
    n = name.lower()
    if "elss" in n or "tax sav" in n:
        return "ELSS"
    if "liquid" in n or "overnight" in n or "money market" in n:
        return "Liquid/Overnight"
    if "debt" in n or "bond" in n or "gilt" in n or "income" in n or "credit risk" in n:
        return "Debt"
    if "hybrid" in n or "balanced" in n or "multi asset" in n or "aggressive hybrid" in n:
        return "Hybrid"
    if "international" in n or "global" in n or "overseas" in n or "nasdaq" in n or "s&p" in n:
        return "International"
    if "index" in n or "nifty" in n or "sensex" in n or "bse" in n:
        return "Index/ETF"
    if "small cap" in n or "smallcap" in n:
        return "Small Cap"
    if "mid cap" in n or "midcap" in n:
        return "Mid Cap"
    if "large cap" in n or "largecap" in n or "bluechip" in n or "top 100" in n or "top 200" in n:
        return "Large Cap"
    if "flexi" in n or "multi cap" in n or "multicap" in n or "focused" in n or "opportunities" in n:
        return "Flexi/Multi Cap"
    # Fall back to casparser's own type classification
    t = asset_type.upper()
    if t == "DEBT":
        return "Debt"
    if t == "HYBRID":
        return "Hybrid"
    if t == "EQUITY":
        return "Equity - Other"
    return "Other"


def main():
    parser = argparse.ArgumentParser(description="Parse CAS PDF and output JSON")
    parser.add_argument("--file", required=True, help="Path to CAS PDF")
    parser.add_argument("--password", default="", help="PDF password")
    parser.add_argument(
        "--mode",
        choices=["full", "summary"],
        default="summary",
        help="full = raw casparser dict; summary = aggregated portfolio view",
    )
    args = parser.parse_args()

    try:
        data = casparser.read_cas_pdf(args.file, args.password, output="dict")
    except CASParseError as e:
        print(json.dumps({"error": str(e), "code": "PARSE_ERROR"}))
        sys.exit(1)
    except FileNotFoundError:
        print(json.dumps({"error": f"File not found: {args.file}", "code": "FILE_NOT_FOUND"}))
        sys.exit(1)

    # Convert Pydantic models to plain dicts recursively
    raw = data.model_dump() if hasattr(data, "model_dump") else dict(data)

    if args.mode == "full":
        result = raw
    else:
        result = _build_summary(raw)

    print(json.dumps(result, default=_serializable, ensure_ascii=False))


if __name__ == "__main__":
    main()
