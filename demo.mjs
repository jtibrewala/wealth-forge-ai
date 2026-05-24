#!/usr/bin/env node
/**
 * WealthForge AI — Interactive Demo
 * Run: node demo.mjs
 * Shows what the agentic workforce can do without needing an LLM connection.
 */

import readline from 'readline';

// Import the math engine directly
import { retirementCorpus, inflationAdjusted } from './skills/finworth-js/dist/index.js';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = q => new Promise(r => rl.question(q, r));

const PROFILES = {
  '1': { label: 'Arjun, 25, Bangalore — Early Career', age: 25, expense: 40000, corpus: 200000, retire: 50, city: 'Bangalore' },
  '2': { label: 'Meera, 35, Mumbai — Mid Career', age: 35, expense: 80000, corpus: 2500000, retire: 55, city: 'Mumbai' },
  '3': { label: 'Rajesh, 45, Delhi — Pre-Retirement', age: 45, expense: 120000, corpus: 8000000, retire: 58, city: 'Delhi' },
};

function fmt(n) { return '₹' + Math.round(n).toLocaleString('en-IN'); }

function printHeader() {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║          🔥 WealthForge AI — Interactive Demo               ║
║          Agentic Personal Finance Workforce                  ║
╚══════════════════════════════════════════════════════════════╝
`);
}

function printFireRoadmap(profile) {
  const { age, expense, corpus, retire } = profile;
  const result = retirementCorpus(expense, age, retire, 85, 0.06, 0.07);
  const yearsToRetire = retire - age;
  const fvExisting = corpus * Math.pow(1.12, yearsToRetire);
  const gap = Math.max(result.corpusNeeded - fvExisting, 0);
  const monthlyRate = Math.pow(1.12, 1/12) - 1;
  const months = yearsToRetire * 12;
  const sipNeeded = gap / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));

  console.log(`
┌──────────────────────────────────────────────────────────────┐
│  🎯 FIRE Roadmap — ${profile.label}
├──────────────────────────────────────────────────────────────┤
│
│  Current Age:          ${age}
│  Target Retirement:    ${retire} (${yearsToRetire} years away)
│  Monthly Expense:      ${fmt(expense)}
│
│  ─── At Retirement (inflation @ 6%) ───
│  Monthly Expense:      ${fmt(result.expenseAtRetirement)}
│  Annual Need:          ${fmt(result.annualExpenseAtRetirement)}
│  Total Corpus Needed:  ${fmt(result.corpusNeeded)}
│
│  ─── Your Position ───
│  Existing Investments: ${fmt(corpus)}
│  FV at Retirement:     ${fmt(fvExisting)} (@ 12% CAGR)
│  Gap to Fund:          ${fmt(gap)}
│
│  ─── Action Plan ───
│  Monthly SIP Needed:   ${fmt(sipNeeded)}
│  Assumed Returns:      12% pre-retirement, 7% post-retirement
│
│  ─── Milestones ───
│  Age ${age + Math.round(yearsToRetire/3)}:  Coast FI (corpus grows on its own)
│  Age ${age + Math.round(2*yearsToRetire/3)}:  Lean FI (can cover basics)
│  Age ${retire}:  Full FIRE 🔥
│
└──────────────────────────────────────────────────────────────┘`);
}

function printHealthScore(profile) {
  const { age, expense, corpus } = profile;
  const emergencyMonths = Math.round(corpus * 0.1 / expense);
  const termCover = expense * 12 * 15;
  const sipRatio = Math.min(((corpus * 0.05) / expense) * 100, 100);

  const scores = {
    emergency: emergencyMonths >= 6 ? '✅' : '⚠️',
    insurance: corpus > 5000000 ? '✅' : '❌',
    sip: sipRatio > 30 ? '✅' : '⚠️',
    debt: '✅',
  };

  const overall = Object.values(scores).filter(s => s === '✅').length;

  console.log(`
┌──────────────────────────────────────────────────────────────┐
│  📊 Financial Health Score — ${profile.label}
├──────────────────────────────────────────────────────────────┤
│
│  Overall Score:  ${overall}/4 ${overall >= 3 ? '🟢 Healthy' : overall >= 2 ? '🟡 Needs Work' : '🔴 Critical'}
│
│  ${scores.emergency} Emergency Fund:  ${emergencyMonths} months (need 6+)
│  ${scores.insurance} Term Insurance:   ${corpus > 5000000 ? 'Adequate' : `Need ${fmt(termCover)} cover`}
│  ${scores.sip} SIP Discipline:  ${Math.round(sipRatio)}% of recommended
│  ${scores.debt} Debt Ratio:      Healthy (no high-interest debt)
│
│  ─── Recommendations ───
│  ${emergencyMonths < 6 ? '→ Build emergency fund to ' + fmt(expense * 6) : '→ Emergency fund adequate ✓'}
│  ${corpus < 5000000 ? '→ Get ₹1Cr term plan immediately' : '→ Insurance coverage adequate ✓'}
│  → Start/increase SIP by ${fmt(expense * 0.3)} monthly
│  → Book LTCG gains up to ₹1.25L this FY (tax-free)
│
└──────────────────────────────────────────────────────────────┘`);
}

function printSipProjection(profile) {
  const sips = [25000, 50000, 100000];
  const years = [10, 20, 30];

  console.log(`
┌──────────────────────────────────────────────────────────────┐
│  📈 SIP Projection Table (12% CAGR, 15% annual step-up)
├──────────────────────────────────────────────────────────────┤
│
│  Monthly SIP  │  10 Years    │  20 Years    │  30 Years
│  ─────────────┼──────────────┼──────────────┼──────────────`);

  for (const sip of sips) {
    const vals = years.map(y => {
      let corpus = 0, current = sip;
      for (let yr = 0; yr < y; yr++) {
        for (let m = 0; m < 12; m++) corpus = (corpus + current) * (1 + 0.12/12);
        current = Math.round(current * 1.15);
      }
      return fmt(corpus).padStart(12);
    });
    console.log(`│  ${fmt(sip).padEnd(11)} │ ${vals[0]} │ ${vals[1]} │ ${vals[2]}`);
  }

  console.log(`│
│  💡 With 15% step-up, ₹50K/month today becomes ₹2L/month in 10 years
│     but your corpus grows exponentially due to compounding.
│
└──────────────────────────────────────────────────────────────┘`);
}

function printAgentShowcase() {
  console.log(`
┌──────────────────────────────────────────────────────────────┐
│  🤖 WealthForge Agent Workforce
├──────────────────────────────────────────────────────────────┤
│
│  Agent                    │ What It Does
│  ─────────────────────────┼──────────────────────────────────
│  📋 User Profile Manager  │ Stores your financial profile
│  🎯 Goal Planner          │ Maps goals → SIP allocation
│  📊 Health Scorecard      │ Scores your financial fitness
│  💰 Tax Strategist        │ Old vs New regime, 80C/80D
│  📈 MF Specialist         │ Overlap, LTCG harvest, rebalance
│  🏠 Loan Specialist       │ Prepay vs invest, refinance
│  🔥 FIRE Calculator       │ Retirement corpus + SIP roadmap
│  ⚠️  Risk Blade (MCP)      │ Hard guardrails on bad advice
│  🧮 Math Blade (MCP)      │ XIRR, SIP projection, tax calc
│  📜 Policy Blade (MCP)    │ SEBI/RBI/IRDAI rules engine
│  💼 Portfolio Blade (MCP)  │ FIRE roadmap, asset allocation
│
│  All agents coordinate via MCP Hub — deterministic math,
│  no hallucination on numbers, regulatory compliance built-in.
│
└──────────────────────────────────────────────────────────────┘`);
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  printHeader();

  console.log('  Choose a demo profile:\n');
  for (const [k, v] of Object.entries(PROFILES)) {
    console.log(`    [${k}] ${v.label}`);
  }
  console.log('');

  const choice = await ask('  Select (1/2/3): ');
  const profile = PROFILES[choice] || PROFILES['2'];
  console.log(`\n  → Using: ${profile.label}\n`);

  let running = true;
  while (running) {
    console.log(`
  What would you like to see?
    [1] 🔥 FIRE Roadmap
    [2] 📊 Financial Health Score
    [3] 📈 SIP Projection Table
    [4] 🤖 Agent Workforce Overview
    [5] Exit
`);
    const action = await ask('  Select (1-5): ');

    switch (action.trim()) {
      case '1': printFireRoadmap(profile); break;
      case '2': printHealthScore(profile); break;
      case '3': printSipProjection(profile); break;
      case '4': printAgentShowcase(); break;
      case '5': running = false; break;
      default: console.log('  Invalid choice. Try 1-5.');
    }
  }

  console.log('\n  👋 Thanks for trying WealthForge AI!');
  console.log('  ⭐ Star us: https://github.com/vikisingh23/wealth-forge-ai\n');
  rl.close();
}

main();
