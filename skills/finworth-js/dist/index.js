/**
 * FinWorth Math Engine — Core financial calculations.
 * Deterministic math for retirement planning, inflation adjustment, and corpus sizing.
 */

/**
 * Calculate retirement corpus needed using the 4% rule adjusted for inflation.
 * @param {number} monthlyExpense - Current monthly expense
 * @param {number} currentAge - Current age
 * @param {number} retirementAge - Target retirement age
 * @param {number} lifeExpectancy - Expected lifespan (default 85)
 * @param {number} inflation - Annual inflation rate (default 0.06)
 * @param {number} postRetReturn - Post-retirement return (default 0.08)
 * @returns {{ corpusNeeded: number, expenseAtRetirement: number, annualWithdrawal: number }}
 */
export function retirementCorpus(monthlyExpense, currentAge, retirementAge, lifeExpectancy = 85, inflation = 0.06, postRetReturn = 0.08) {
  const yearsToRetire = retirementAge - currentAge;
  const retirementYears = lifeExpectancy - retirementAge;

  // Expense at retirement (inflation-adjusted)
  const expenseAtRetirement = monthlyExpense * Math.pow(1 + inflation, yearsToRetire);
  const annualWithdrawal = expenseAtRetirement * 12;

  // Corpus needed: PV of annuity (inflation-adjusted withdrawals over retirement years)
  const realReturn = (1 + postRetReturn) / (1 + inflation) - 1;
  let corpusNeeded;
  if (realReturn <= 0) {
    corpusNeeded = annualWithdrawal * retirementYears;
  } else {
    corpusNeeded = annualWithdrawal * (1 - Math.pow(1 + realReturn, -retirementYears)) / realReturn;
  }

  return {
    corpusNeeded: Math.round(corpusNeeded),
    expenseAtRetirement: Math.round(expenseAtRetirement),
    annualWithdrawal: Math.round(annualWithdrawal),
    yearsToRetire,
    retirementYears
  };
}

/**
 * Adjust a present value for inflation over N years.
 * @param {number} amount - Present value
 * @param {number} years - Number of years
 * @param {number} inflation - Annual inflation rate (default 0.06)
 * @returns {number} Future value adjusted for inflation
 */
export function inflationAdjusted(amount, years, inflation = 0.06) {
  return Math.round(amount * Math.pow(1 + inflation, years));
}
