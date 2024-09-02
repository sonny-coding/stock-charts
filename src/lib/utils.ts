import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
interface FinancialData {
  fiscalDateEnding: string;
  totalRevenue: string;
  operatingIncome: string;
  netIncome: string;
  grossProfit: string;
  operatingExpenses: string;
  sellingGeneralAndAdministrative: string;
  researchAndDevelopment: string;
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
        grossMargin:
          parseFloat(report.grossProfit) / parseFloat(report.totalRevenue),
      };
    })
    .reverse();
};
export const processMargins = (data: FinancialData[]) => {
  return data
    .map((report: FinancialData) => {
      return {
        year: report.fiscalDateEnding,
        grossMargin: (
          (parseFloat(report.grossProfit) / parseFloat(report.totalRevenue)) *
          100
        ).toFixed(2),
        operatingMargin: (
          (parseFloat(report.operatingIncome) /
            parseFloat(report.totalRevenue)) *
          100
        ).toFixed(2),
        netMargin: (
          (parseFloat(report.netIncome) / parseFloat(report.totalRevenue)) *
          100
        ).toFixed(2),
      };
    })
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
        (((currentValue - previousValue) / previousValue) * 100).toFixed(2)
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
