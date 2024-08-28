export const getAnnualIncome = (data: any) => {
  return data.annualReports.map((year: any) => {
    return {
      year: year.fiscalDateEnding,
      revenue: Number(year.totalRevenue),
      operatingIncome: Number(year.operatingIncome),
      netIncome: Number(year.netIncome),
    };
  });
};
export const getQuarterNetIncome = (data: any) => {
  return data.quarterlyReports.map((year: any) => {
    return {
      year: year.fiscalDateEnding,
      income: Number(year.netIncome),
    };
  });
};

export const getMargins = (
  data: any,
  reportType: "annualReports" | "quarterlyReports"
) => {
  const reports = data[reportType];

  return reports.map((year: any) => {
    // Centralized data extraction and conversion
    const {
      fiscalDateEnding,
      grossProfit,
      totalRevenue,
      operatingIncome,
      netIncome,
    } = year;

    const fiscalYear = parseInt(fiscalDateEnding.split("-")[0]);
    const grossProfitNum = Number(grossProfit);
    const totalRevenueNum = Number(totalRevenue);
    const operatingIncomeNum = Number(operatingIncome);
    const netIncomeNum = Number(netIncome);

    // // Early return for invalid data
    // if (totalRevenueNum === 0) {
    //   return null; // Or throw an error, depending on desired behavior
    // }

    // Calculate margins (using more descriptive names)
    const grossProfitMargin = parseFloat(
      ((grossProfitNum / totalRevenueNum) * 100).toFixed(2)
    );
    const operatingProfitMargin = parseFloat(
      ((operatingIncomeNum / totalRevenueNum) * 100).toFixed(2)
    );
    const netProfitMargin = parseFloat(
      ((netIncomeNum / totalRevenueNum) * 100).toFixed(2)
    );

    return {
      fiscalYear,
      grossProfitMargin,
      operatingProfitMargin,
      netProfitMargin,
    };
  });
};
