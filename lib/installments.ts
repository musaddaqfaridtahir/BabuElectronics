/**
 * Financial Engine & Single Source of Truth for Installment Calculations.
 * Handles cash prices, installment price overrides, downpayment percentages,
 * and duration tenures across Cards, Modals, Calculators, and Product pages.
 */

export interface InstallmentProductInput {
  cashPrice: number;
  installmentPrice?: number;
  downpaymentBase?: number;
  durationMonths?: number;
}

export interface InstallmentOptions {
  customDownpaymentPct?: number; // e.g. 20, 25, 30, 40, 50
  customDownpaymentAmount?: number;
  customTenureMonths?: number; // e.g. 6, 10, 12, 14, 16
}

export interface InstallmentPlan {
  cashPrice: number;
  totalInstallmentPrice: number;
  downpaymentAmount: number;
  downpaymentPct: number;
  financedAmount: number;
  tenureMonths: number;
  monthlyPayment: number;
  markupAmount: number;
  markupRatePercentage: number;
  isUnder100k: boolean;
}

/**
 * Tiered markup percentage based on tenure duration:
 * - 6 Mo: 12% (15% if cash price < 100k)
 * - 8 Mo: 15% (18% if < 100k)
 * - 10 Mo: 18% (21% if < 100k)
 * - 12 Mo: 20% (25% if < 100k)
 * - 14 Mo: 24% (28% if < 100k)
 * - 16 Mo: 28% (32% if < 100k)
 */
export function getTieredMarkupRate(tenureMonths: number, isUnder100k: boolean): number {
  if (tenureMonths <= 6) return isUnder100k ? 15 : 12;
  if (tenureMonths <= 8) return isUnder100k ? 18 : 15;
  if (tenureMonths <= 10) return isUnder100k ? 21 : 18;
  if (tenureMonths <= 12) return isUnder100k ? 25 : 20;
  if (tenureMonths <= 14) return isUnder100k ? 28 : 24;
  return isUnder100k ? 32 : 28;
}

export function calculateInstallmentPlan(
  product: InstallmentProductInput,
  options?: InstallmentOptions
): InstallmentPlan {
  const cashPrice = Math.max(0, Number(product.cashPrice) || 0);
  const isUnder100k = cashPrice < 100000;
  const tenureMonths = Math.max(1, options?.customTenureMonths || product.durationMonths || 12);
  const tieredMarkupRate = getTieredMarkupRate(tenureMonths, isUnder100k);

  // 1. Calculate Downpayment
  let downpaymentAmount = 0;
  let downpaymentPct = options?.customDownpaymentPct ?? 20;

  if (options?.customDownpaymentAmount !== undefined) {
    downpaymentAmount = Math.max(0, options.customDownpaymentAmount);
    downpaymentPct = cashPrice > 0 ? Math.round((downpaymentAmount / cashPrice) * 100) : 20;
  } else if (options?.customDownpaymentPct !== undefined) {
    downpaymentPct = Math.max(10, Math.min(80, options.customDownpaymentPct));
    downpaymentAmount = Math.round((cashPrice * downpaymentPct) / 100);
  } else if (product.downpaymentBase && product.downpaymentBase > 0) {
    downpaymentAmount = product.downpaymentBase;
    downpaymentPct = cashPrice > 0 ? Math.round((downpaymentAmount / cashPrice) * 100) : 20;
  } else {
    downpaymentAmount = Math.round((cashPrice * downpaymentPct) / 100);
  }

  // Ensure downpayment doesn't exceed cash price
  downpaymentAmount = Math.min(downpaymentAmount, cashPrice);

  // 2. Determine Total Installment Price with Tenure-Adjusted Markup
  let totalInstallmentPrice = 0;
  let markupAmount = 0;
  let markupRatePercentage = tieredMarkupRate;

  const financedPrincipal = Math.max(0, cashPrice - downpaymentAmount);

  if (
    product.installmentPrice &&
    product.installmentPrice > cashPrice &&
    (!options?.customTenureMonths || options.customTenureMonths === (product.durationMonths || 12))
  ) {
    totalInstallmentPrice = Math.round(product.installmentPrice);
    markupAmount = totalInstallmentPrice - cashPrice;
    markupRatePercentage = cashPrice > 0 ? Math.round((markupAmount / cashPrice) * 100) : tieredMarkupRate;
  } else {
    markupAmount = Math.round(financedPrincipal * (tieredMarkupRate / 100));
    totalInstallmentPrice = cashPrice + markupAmount;
    markupRatePercentage = tieredMarkupRate;
  }

  // 3. Financed balance & monthly payment
  const financedAmount = Math.max(0, totalInstallmentPrice - downpaymentAmount);
  const monthlyPayment = tenureMonths > 0 ? Math.round(financedAmount / tenureMonths) : 0;

  return {
    cashPrice,
    totalInstallmentPrice,
    downpaymentAmount,
    downpaymentPct,
    financedAmount,
    tenureMonths,
    monthlyPayment,
    markupAmount,
    markupRatePercentage,
    isUnder100k,
  };
}
