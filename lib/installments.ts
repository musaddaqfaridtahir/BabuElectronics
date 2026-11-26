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
  categorySlug?: string;
  category?: { slug?: string; name?: string } | null;
}

export interface InstallmentOptions {
  customDownpaymentPct?: number; // e.g. 30, 35, 40, 50
  customDownpaymentAmount?: number;
  customTenureMonths?: number; // e.g. 6, 8, 10 for mobiles; 6..16 for others
  isMobile?: boolean;
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

  // Check if product is mobile phone (Store Rule: 30% on total cash price @ 10 months = 3%/month; max 10 months plan)
  const isMobile =
    Boolean(options?.isMobile) ||
    product.categorySlug === 'mobiles' ||
    product.category?.slug === 'mobiles';

  let tenureMonths = Math.max(1, options?.customTenureMonths || product.durationMonths || (isMobile ? 10 : 12));
  if (isMobile && tenureMonths > 10) {
    tenureMonths = 10;
  }

  // Mobiles: 30% on total price at 10 months => 3% per month (e.g. 6M=18%, 8M=24%, 10M=30%)
  const tieredMarkupRate = isMobile
    ? Math.round((30 / 10) * tenureMonths)
    : getTieredMarkupRate(tenureMonths, isUnder100k);

  // 1. Calculate Downpayment (Minimum 30% on all products per store policy)
  const minDownpaymentPct = 30;
  let downpaymentPct = Math.max(minDownpaymentPct, options?.customDownpaymentPct ?? 30);
  const min30Downpayment = Math.round((cashPrice * 0.3) / 100) * 100;

  let downpaymentAmount = 0;
  if (options?.customDownpaymentAmount !== undefined) {
    downpaymentAmount = Math.max(min30Downpayment, options.customDownpaymentAmount);
    downpaymentPct = cashPrice > 0 ? Math.round((downpaymentAmount / cashPrice) * 100) : 30;
  } else if (options?.customDownpaymentPct !== undefined) {
    downpaymentPct = Math.max(30, Math.min(80, options.customDownpaymentPct));
    downpaymentAmount = Math.round((cashPrice * downpaymentPct) / 100);
  } else if (product.downpaymentBase && product.downpaymentBase > 0) {
    downpaymentAmount = Math.max(min30Downpayment, product.downpaymentBase);
    downpaymentPct = cashPrice > 0 ? Math.round((downpaymentAmount / cashPrice) * 100) : 30;
  } else {
    downpaymentAmount = Math.round((cashPrice * downpaymentPct) / 100);
  }

  // Round downpayment to clean nearest 100 and cap at cash price
  downpaymentAmount = Math.round(downpaymentAmount / 100) * 100;
  downpaymentAmount = Math.min(downpaymentAmount, cashPrice);

  // 2. Determine Total Installment Price with Tenure-Adjusted Markup
  let totalInstallmentPrice = 0;
  let markupAmount = 0;
  let markupRatePercentage = tieredMarkupRate;

  const financedPrincipal = Math.max(0, cashPrice - downpaymentAmount);

  if (isMobile) {
    // Mobiles: markup is charged on TOTAL cash price (30% at 10M, reduced proportionally for fewer months)
    markupRatePercentage = tieredMarkupRate;
    markupAmount = Math.round(cashPrice * (markupRatePercentage / 100));
    totalInstallmentPrice = cashPrice + markupAmount;
  } else if (
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

  // 3. Financed balance & monthly payment (Rounded to clean nearest 100 figure)
  // e.g. 2010 -> 2000, 2080 or 2090 -> 2100
  const financedAmount = Math.max(0, totalInstallmentPrice - downpaymentAmount);
  const rawMonthly = tenureMonths > 0 ? financedAmount / tenureMonths : 0;
  const monthlyPayment = Math.round(rawMonthly / 100) * 100;

  // Harmonize total installment price to match downpayment + (monthlyPayment * tenureMonths)
  totalInstallmentPrice = downpaymentAmount + (monthlyPayment * tenureMonths);
  markupAmount = Math.max(0, totalInstallmentPrice - cashPrice);

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
