import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export interface FinancialData {
  fiscalDateEnding: string;
  reportedCurrency: string;
  grossProfit: string;
  totalRevenue: string;
  costOfRevenue: string;
  costofGoodsAndServicesSold: string;
  operatingIncome: string;
  sellingGeneralAndAdministrative: string;
  researchAndDevelopment: string;
  operatingExpenses: string;
  investmentIncomeNet: string;
  netInterestIncome: string;
  interestIncome: string;
  interestExpense: string;
  nonInterestIncome: string;
  otherNonOperatingIncome: string;
  depreciation: string;
  depreciationAndAmortization: string;
  incomeBeforeTax: string;
  incomeTaxExpense: string;
  interestAndDebtExpense: string;
  netIncomeFromContinuingOperations: string;
  comprehensiveIncomeNetOfTax: string;
  ebit: string;
  ebitda: string;
  netIncome: string;
}

interface GrowthRate {
  year: string;
  revenueGrowth: number;
  operatingIncomeGrowth: number;
  netIncomeGrowth: number;
}

export const processData = (data: FinancialData[]) => {
  return data
    .map((report: FinancialData) => {
      return {
        year: report.fiscalDateEnding,
        revenue: Number(report.totalRevenue),
        grossProfit: Number(report.grossProfit),
        operatingIncome: Number(report.operatingIncome),
        netIncome: Number(report.netIncome),
      };
    })
    .reverse();
};
export const processMargins = (data: FinancialData[]) => {
  return data
    .map(
      ({
        fiscalDateEnding,
        grossProfit,
        totalRevenue,
        operatingIncome,
        netIncome,
      }) => ({
        year: fiscalDateEnding,
        grossMargin: Number(
          (parseFloat(grossProfit) / parseFloat(totalRevenue)).toFixed(4)
        ),
        operatingMargin: Number(
          (parseFloat(operatingIncome) / parseFloat(totalRevenue)).toFixed(4)
        ),
        netMargin: Number(
          (parseFloat(netIncome) / parseFloat(totalRevenue)).toFixed(4)
        ),
      })
    )
    .reverse();
};

export function processGrowth(data: FinancialData[]): GrowthRate[] {
  // Sort the data by fiscal date, most recent first
  const sortedData = data.sort(
    (a, b) =>
      new Date(b.fiscalDateEnding).getTime() -
      new Date(a.fiscalDateEnding).getTime()
  );
  const growthRates: GrowthRate[] = [];

  for (let i = 0; i < sortedData.length - 1; i++) {
    const currentYear = sortedData[i];
    const previousYear = sortedData[i + 1];

    const calculateGrowth = (current: string, previous: string): number => {
      const currentValue = parseFloat(current);
      const previousValue = parseFloat(previous);
      return Number(
        ((currentValue - previousValue) / previousValue).toFixed(4)
      );
    };

    growthRates.push({
      year: currentYear.fiscalDateEnding,
      revenueGrowth: calculateGrowth(
        currentYear.totalRevenue,
        previousYear.totalRevenue
      ),
      operatingIncomeGrowth: calculateGrowth(
        currentYear.operatingIncome,
        previousYear.operatingIncome
      ),
      netIncomeGrowth: calculateGrowth(
        currentYear.netIncome,
        previousYear.netIncome
      ),
    });
  }

  return growthRates.reverse();
}

export const processOperatingExpenses = (data: FinancialData[]) => {
  return data
    .map((report: FinancialData) => {
      return {
        year: report.fiscalDateEnding,
        operatingExpenses: Number(report.operatingExpenses),
        sellingGeneralAndAdministrative: Number(
          report.sellingGeneralAndAdministrative
        ),
        researchAndDevelopment: Number(report.researchAndDevelopment),
      };
    })
    .reverse();
};

export const formatValue = (value: number, isPercent: boolean = false) => {
  if (typeof value !== "number") {
    return value;
  }

  if (isPercent) {
    return new Intl.NumberFormat("en-US", {
      style: "percent",
      maximumFractionDigits: 2,
    }).format(value);
  } else {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(value);
  }
};
