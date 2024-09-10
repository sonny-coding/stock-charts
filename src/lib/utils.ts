import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export interface IncomeData {
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

export const processCostsOverRevenue = (data: any[]) => {
  return data
    .map((report) => {
      const calculateRatio = (numerator: string, denominator: string) => {
        const num = parseFloat(numerator);
        const den = parseFloat(denominator);
        if (isNaN(num) || isNaN(den) || den === 0) {
          return 0;
        }
        return Number((num / den).toFixed(4));
      };

      return {
        year: report.fiscalDateEnding,
        cogsRatio: calculateRatio(
          report.costofGoodsAndServicesSold,
          report.totalRevenue
        ),
        rndRatio: calculateRatio(
          report.researchAndDevelopment,
          report.totalRevenue
        ),
        sgaRatio: calculateRatio(
          report.sellingGeneralAndAdministrative,
          report.totalRevenue
        ),
      };
    })
    .reverse();
};

export const processData = (data: any[]) => {
  return data
    .map((report) => {
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

export function processGrowth(data: any[]) {
  // Sort the data by fiscal date, most recent first
  const sortedData = data.sort(
    (a, b) =>
      new Date(b.fiscalDateEnding).getTime() -
      new Date(a.fiscalDateEnding).getTime()
  );
  const growthRates = [];

  for (let i = 0; i < sortedData.length - 1; i++) {
    const current = sortedData[i];
    const previous = sortedData[i + 1];

    const calculateGrowth = (current: string, previous: string): number => {
      const currentValue = parseFloat(current);
      const previousValue = parseFloat(previous);
      const growth = (currentValue - previousValue) / previousValue;
      if (growth < 0) {
        return Number(growth * -1);
      } else return Number(growth);
    };

    growthRates.push({
      year: current.fiscalDateEnding,
      revenueGrowth: calculateGrowth(
        current.totalRevenue,
        previous.totalRevenue
      ),
      operatingExpenses: calculateGrowth(
        current.operatingExpenses,
        previous.operatingExpenses
      ),
      netIncomeGrowth: calculateGrowth(current.netIncome, previous.netIncome),
    });
  }

  return growthRates.reverse();
}
export const processMargins = (data: IncomeData[]) => {
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

export const processOperatingExpenses = (data: IncomeData[]) => {
  return data
    .map((report: IncomeData) => {
      return {
        year: report.fiscalDateEnding,
        operatingExpenses: isNaN(Number(report.operatingExpenses))
          ? 0
          : Number(report.operatingExpenses),
        sellingGeneralAndAdministrative: isNaN(
          Number(report.sellingGeneralAndAdministrative)
        )
          ? 0
          : Number(report.sellingGeneralAndAdministrative),
        researchAndDevelopment: isNaN(Number(report.researchAndDevelopment))
          ? 0
          : Number(report.researchAndDevelopment),
      };
    })
    .reverse();
};

export const processFCF = (data: any[]) => {
  return data
    .map((report) => {
      return {
        year: report.fiscalDateEnding,
        operatingCashFlow: Number(report.operatingCashflow),
        capitalExpenditure: Number(report.capitalExpenditures),
        fcf:
          parseInt(report.operatingCashflow) -
          parseInt(report.capitalExpenditures),
      };
    })
    .reverse();
};

export const processCashFlow = (data: any[]) => {
  return data
    .map((report) => {
      return {
        year: report.fiscalDateEnding,
        operatingCashFlow: Number(report.operatingCashflow),
        cashflowFromInvestment: Number(report.cashflowFromInvestment),
        cashflowFromFinancing: Number(report.cashflowFromFinancing),
      };
    })
    .reverse();
};
export const formatValue = (
  value: number,
  isPercent: boolean = false,
  isMillion: boolean = false
) => {
  if (typeof value !== "number") {
    return value;
  }

  if (isPercent) {
    return new Intl.NumberFormat("en-US", {
      style: "percent",
      maximumFractionDigits: 2,
    }).format(value);
  } else if (isMillion) {
    // For millions, divide by 1,000,000 and add "M" to the formatted value
    const millions = value / 1000000;
    return (
      new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2,
      }).format(millions) + "M"
    );
  } else {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(value);
  }
};

export const removeDuplicates = (arr: any[]) => {
  return [...new Set(arr)];
};
