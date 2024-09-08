import { LabelConfig } from "@/components/charts/BarGraph";

export const growthLabelConfig: LabelConfig = {
  revenueGrowth: {
    label: "Revenue Growth",
    color: "hsl(var(--chart-1))",
    type: "line",
  },
  operatingExpenses: {
    label: "OpEx Growth",
    color: "hsl(var(--chart-2))",
    type: "line",
  },
  netIncomeGrowth: {
    label: "Income Growth",
    color: "hsl(var(--chart-3))",
    type: "line",
  },
};
export const marginLabelConfig: LabelConfig = {
  grossMargin: {
    label: "Gross Margin",
    color: "hsl(var(--chart-1))",
    type: "line",
  },
  operatingMargin: {
    label: "Operating Margin",
    color: "hsl(var(--chart-2))",
    type: "line",
  },
  netMargin: {
    label: "Net Margin",
    color: "hsl(var(--chart-3))",
    type: "line",
  },
};
export const costRatioLabelConfig: LabelConfig = {
  cogsRatio: {
    label: "COGS %",
    color: "hsl(var(--chart-1))",
    type: "line",
  },
  rndRatio: {
    label: "R&D %",
    color: "hsl(var(--chart-2))",
    type: "line",
  },
  sgaRatio: {
    label: "SG&A %",
    color: "hsl(var(--chart-3))",
    type: "line",
  },
};
export const composedLabelConfig: LabelConfig = {
  operatingExpenses: {
    label: "Operating Expenses",
    color: "hsl(var(--chart-1))",
    type: "line",
  },
  sellingGeneralAndAdministrative: {
    label: "SG&A",
    color: "hsl(var(--chart-2))",
    type: "bar",
  },
  researchAndDevelopment: {
    label: "R&D",
    color: "hsl(var(--chart-3))",
    type: "bar",
  },
};

export const barLabelConfig: LabelConfig = {
  revenue: {
    label: `Revenue`,
    color: "hsl(var(--chart-1))",
    type: "bar",
  },
  grossProfit: {
    label: `Gross Profit`,
    color: "hsl(var(--chart-2))",
    type: "bar",
  },
  operatingIncome: {
    label: "Operating Income",
    color: "hsl(var(--chart-3))",
    type: "bar",
  },
  netIncome: {
    label: "Net Income",
    color: "hsl(var(--chart-4))",
    type: "bar",
  },
};
// CASH FLOW CONFIGS
export const fcfLabelConfig: LabelConfig = {
  operatingCashFlow: {
    label: "OCF",
    color: "hsl(var(--chart-1))",
    type: "bar",
  },
  capitalExpenditure: {
    label: "Capital Expenditures",
    color: "hsl(var(--chart-2))",
    type: "bar",
  },
  fcf: {
    label: "FCF",
    color: "hsl(var(--chart-3))",
    type: "bar",
  },
};
export const cfLabelConfig: LabelConfig = {
  operatingCashFlow: {
    label: "OCF",
    color: "hsl(var(--chart-1))",
    type: "line",
  },
  cashflowFromInvestment: {
    label: "Investment Cash Flow",
    color: "hsl(var(--chart-2))",
    type: "line",
  },
  cashflowFromFinancing: {
    label: "Financing Cash Flow",
    color: "hsl(var(--chart-3))",
    type: "line",
  },
};
