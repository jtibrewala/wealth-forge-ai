#!/usr/bin/env node
/**
 * Persistent User Profile — Local JSON file storage.
 * Stores financial profiles in ~/.wealthforge/profiles/
 * Agents read/write here so data persists across sessions.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

const PROFILE_DIR = join(homedir(), '.wealthforge', 'profiles');

// Ensure directory exists
if (!existsSync(PROFILE_DIR)) mkdirSync(PROFILE_DIR, { recursive: true });

export function getProfilePath(name = 'primary') {
  return join(PROFILE_DIR, `${name}.json`);
}

export function loadProfile(name = 'primary') {
  const path = getProfilePath(name);
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, 'utf8'));
}

export function saveProfile(data, name = 'primary') {
  const path = getProfilePath(name);
  data._updated = new Date().toISOString();
  writeFileSync(path, JSON.stringify(data, null, 2));
  return path;
}

export function listProfiles() {
  if (!existsSync(PROFILE_DIR)) return [];
  return readdirSync(PROFILE_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''));
}

export function deleteProfile(name) {
  const path = getProfilePath(name);
  if (existsSync(path)) { const { unlinkSync } = await import('fs'); unlinkSync(path); return true; }
  return false;
}

// Profile schema template
export const PROFILE_SCHEMA = {
  // Basics
  name: "",
  age: 0,
  retirement_age: 60,
  city: "",
  metro: true,
  family: { spouse: false, kids: [], dependents: [] },

  // Income
  ctc: 0,
  monthly_take_home: 0,
  other_income: { rental: 0, freelance: 0, interest: 0, dividends: 0 },
  salary_growth: 0.10,

  // Expenses
  essential_monthly: 0,
  lifestyle_monthly: 0,
  total_monthly_expense: 0,

  // Loans
  loans: [], // [{type, principal, rate, emi, tenure_remaining, tax_benefit}]

  // Investments
  investments: {
    mf_portfolio: 0,
    mf_schemes: [], // [{scheme, folio, value, plan, category}]
    epf: 0,
    ppf: 0,
    nps: 0,
    fd: 0,
    gold: 0,
    stocks: 0,
    real_estate: [],
    savings_account: 0,
  },

  // Insurance
  insurance: {
    term_cover: 0,
    term_premium: 0,
    health_cover: 0,
    health_premium: 0,
    employer_health: 0,
    ulips: [], // [{name, premium, value, irr}]
    endowments: [],
  },

  // Goals
  goals: [], // [{name, target_amount, target_year, current_allocation, monthly_sip}]

  // Preferences
  risk_profile: "moderate", // conservative | moderate | aggressive
  tax_regime: "new",
  sip_total: 0,
  sip_step_up: 0.15,

  // Scores (auto-calculated)
  health_score: null,
  last_cas_date: null,

  // Metadata
  _created: "",
  _updated: "",
};
