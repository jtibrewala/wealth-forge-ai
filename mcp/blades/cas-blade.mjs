/**
 * CAS Blade: Parse CAMS/KFintech/NSDL/CDSL Consolidated Account Statements.
 * Shells out to scripts/parse_cas.py (casparser library) for all PDF parsing.
 */

import { spawn } from "child_process";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import { platform } from "os";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "../..");
const BRIDGE = path.resolve(PROJECT_ROOT, "scripts/parse_cas.py");

// Prefer the project venv's Python so casparser is always available
const VENV_PYTHON = path.resolve(
    PROJECT_ROOT,
    platform() === "win32" ? ".venv/Scripts/python.exe" : ".venv/bin/python3"
);
const PYTHON = fs.existsSync(VENV_PYTHON) ? VENV_PYTHON : "python3";

function runPythonBridge(file, password, mode) {
    return new Promise((resolve, reject) => {
        const proc = spawn(PYTHON, [
            BRIDGE,
            "--file", file,
            "--password", password,
            "--mode", mode,
        ]);

        let stdout = "";
        let stderr = "";
        proc.stdout.on("data", d => (stdout += d));
        proc.stderr.on("data", d => (stderr += d));

        proc.on("close", code => {
            try {
                const result = JSON.parse(stdout);
                if (result.error) {
                    reject(new Error(`${result.code}: ${result.error}`));
                } else {
                    resolve(result);
                }
            } catch {
                reject(new Error(`Parser crashed (exit ${code}): ${stderr.trim() || stdout.trim()}`));
            }
        });

        proc.on("error", err => reject(new Error(`Failed to start Python: ${err.message}. Run: python3 -m venv .venv && .venv/bin/pip install casparser`)));
    });
}

export class CasBlade {
    constructor() {
        this.tools = [
            {
                name: "parse_statement",
                description: "Parse a CAS PDF (CAMS/KFintech/NSDL/CDSL) and return a full portfolio summary: total value, invested amount, gain, scheme-level breakdown, and allocation by category. Handles password-protected PDFs.",
                inputSchema: {
                    type: "object",
                    properties: {
                        file_path: {
                            type: "string",
                            description: "Absolute path to the CAS PDF file",
                        },
                        password: {
                            type: "string",
                            description: "PDF password (empty string if unprotected)",
                            default: "",
                        },
                    },
                    required: ["file_path"],
                },
            },
            {
                name: "get_raw_data",
                description: "Parse a CAS PDF and return the full raw data including all folios, schemes, and every individual transaction. Use this when you need transaction-level detail for XIRR or capital gains calculations.",
                inputSchema: {
                    type: "object",
                    properties: {
                        file_path: {
                            type: "string",
                            description: "Absolute path to the CAS PDF file",
                        },
                        password: {
                            type: "string",
                            description: "PDF password (empty string if unprotected)",
                            default: "",
                        },
                    },
                    required: ["file_path"],
                },
            },
        ];
    }

    async execute(toolName, args) {
        if (toolName === "parse_statement") return this._parseStatement(args);
        if (toolName === "get_raw_data") return this._getRawData(args);
        throw new Error(`Tool ${toolName} not found in CAS Blade.`);
    }

    async _parseStatement({ file_path, password = "" }) {
        const data = await runPythonBridge(file_path, password, "summary");
        return {
            ...data,
            total_value_fmt: `₹${Math.round(data.total_value).toLocaleString("en-IN")}`,
            total_invested_fmt: `₹${Math.round(data.total_invested).toLocaleString("en-IN")}`,
            total_gain_fmt: `₹${Math.round(data.total_gain).toLocaleString("en-IN")}`,
            overall_return_pct: data.total_invested > 0
                ? +((data.total_gain / data.total_invested) * 100).toFixed(2)
                : 0,
        };
    }

    async _getRawData({ file_path, password = "" }) {
        return runPythonBridge(file_path, password, "full");
    }
}
