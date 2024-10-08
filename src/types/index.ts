export interface IncomeYear {
  revenue: number;
  operatingIncome: number;
  netIncome: number;
  year: string;
}

export interface Margins {
  fiscalYear: number;
  grossProfitMargin: number;
  operatingProfitMargin: number;
  netProfitMargin: number;
}

export interface AnnualReport {
  fiscalDateEnding: string;
  totalRevenue: string;
  operatingIncome: string;
  netIncome: string;
}
