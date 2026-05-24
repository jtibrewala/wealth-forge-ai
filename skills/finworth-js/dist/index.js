/**
 * FinWorth JS — ESM wrapper for wealth-forge-ai
 * Compatible with finworth-js v0.8.0 API signatures.
 * 
 * To use the full published package instead of this stub:
 *   npm install finworth-js@^0.8.0
 *   Then change portfolio-blade.mjs import to: import { retirementCorpus, inflationAdjusted } from "finworth-js"
 * 
 * Required: finworth-js >= 0.8.0
 */

function round(n, d = 2) { return Math.round(n * 10 ** d) / 10 ** d; }

/**
 * Real return adjusted for inflation.
 * @param {number} nominalReturn - e.g., 0.12 for 12%
 * @param {number} inflation - e.g., 0.06 for 6%
 * @returns {number} Real return rate
 */
export function inflationAdjusted(nominalReturn, inflation) {
  return round((1 + nominalReturn) / (1 + inflation) - 1, 6);
}

/**
 * Calculate retirement corpus needed.
 * @param {number} monthlyExpense - Current monthly expense
 * @param {number} currentAge - Default 30
 * @param {number} retirementAge - Default 60
 * @param {number} lifeExpectancy - Default 85
 * @param {number} inflation - Default 0.06
 * @param {number} postRetirementReturn - Default 0.07
 */
export function retirementCorpus(monthlyExpense, currentAge = 30, retirementAge = 60, lifeExpectancy = 85, inflation = 0.06, postRetirementReturn = 0.07) {
  const ytr = retirementAge - currentAge;
  const yir = lifeExpectancy - retirementAge;
  const futureMonthly = monthlyExpense * (1 + inflation) ** ytr;
  const futureAnnual = futureMonthly * 12;
  const realReturn = (1 + postRetirementReturn) / (1 + inflation) - 1;

  let corpusNeeded;
  if (realReturn <= 0) {
    corpusNeeded = futureAnnual * yir;
  } else {
    corpusNeeded = futureAnnual * (1 - (1 + realReturn) ** -yir) / realReturn;
  }

  const monthlyRate = (1 + 0.12) ** (1/12) - 1;
  const months = ytr * 12;
  const sipNeeded = corpusNeeded / (((1 + monthlyRate) ** months - 1) / monthlyRate * (1 + monthlyRate));

  return {
    corpusNeeded: Math.round(corpusNeeded),
    expenseAtRetirement: Math.round(futureMonthly),
    annualExpenseAtRetirement: Math.round(futureAnnual),
    sipNeeded: Math.round(sipNeeded),
    yearsToRetire: ytr,
    retirementYears: yir,
  };
}

/**
 * Future cost of a current expense adjusted for inflation.
 * @param {number} currentCost
 * @param {number} inflation - Default 0.06
 * @param {number} years - Default 20
 */
export function futureCost(currentCost, inflation = 0.06, years = 20) {
  return Math.round(currentCost * (1 + inflation) ** years);
}
