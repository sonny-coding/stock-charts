import Banner from "@/components/Banner";
import BarGraph from "@/components/charts/BarGraph";
import LineBarComposedChart from "@/components/charts/LineBarComposedChart";
import LineGraph from "@/components/charts/LineGraph";
// import DialogDemo from "@/components/header/SearchDialog";
import { tsla, tslaCashFlow } from "@/data";
import {
  barLabelConfig,
  growthLabelConfig,
  marginLabelConfig,
  costRatioLabelConfig,
  composedLabelConfig,
  fcfLabelConfig,
  cfLabelConfig,
} from "@/lib/graphconfig";
import {
  processData,
  processGrowth,
  processMargins,
  processCostsOverRevenue,
  processFCF,
  processCashFlow,
  processOperatingExpenses,
} from "@/lib/utils";

type PageProps = {
  params: {
    ticker: string;
  };
  searchParams: {
    query: string;
  };
};

const searchTicker = async (type: string, ticker: string, apiKey: string) => {
  try {
    const res = await fetch(
      `https://www.alphavantage.co/query?function=${type}&symbol=${ticker}&apikey=${apiKey}`
    );
    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export default async function Page({
  params: { ticker },
  searchParams,
}: PageProps) {
  const incomeData = await searchTicker(
    "INCOME_STATEMENT",
    ticker,
    process.env.ALPHA_VANTAGE_KEY as string
  );
  const cashFlowData = await searchTicker(
    "CASH_FLOW",
    ticker,
    process.env.ALPHA_VANTAGE_KEY as string
  );
  const maxQuarterLength = Math.min(incomeData.quarterlyReports.length, 15);
  return (
    <div className="max-w-5xl mx-auto space-y-2 mt-2">
      <Banner ticker={ticker} />
      <BarGraph
        labels={barLabelConfig}
        title={"Revenue & Earnings"}
        annualData={processData(incomeData.annualReports)}
        quarterlyData={processData(
          incomeData.quarterlyReports.slice(0, maxQuarterLength)
        )}
      />

      <LineGraph
        labels={marginLabelConfig}
        title="Margins"
        isPercent={true}
        annualData={processMargins(incomeData.annualReports)}
        quarterlyData={processMargins(
          incomeData.quarterlyReports.slice(0, maxQuarterLength)
        )}
      />
      <LineGraph
        labels={growthLabelConfig}
        title={"Growth"}
        annualData={processGrowth(incomeData.annualReports)}
        quarterlyData={processGrowth(incomeData.quarterlyReports).slice(
          maxQuarterLength * -1
        )}
        isPercent={true}
      />

      <LineGraph
        annualData={processCostsOverRevenue(incomeData.annualReports)}
        quarterlyData={processCostsOverRevenue(
          incomeData.quarterlyReports
        ).slice(maxQuarterLength * -1)}
        labels={costRatioLabelConfig}
        title="Expenses / Revenue"
        isPercent={true}
      />
      <LineBarComposedChart
        labels={composedLabelConfig}
        annualData={processOperatingExpenses(incomeData.annualReports)}
        quarterlyData={processOperatingExpenses(
          incomeData.quarterlyReports
        ).slice(maxQuarterLength * -1)}
        title="Operating Expenses"
      />
      <BarGraph
        labels={fcfLabelConfig}
        title={"Free Cash Flow"}
        // processData={processFCF}
        annualData={processFCF(cashFlowData.annualReports)}
        quarterlyData={processFCF(cashFlowData.quarterlyReports).slice(
          maxQuarterLength * -1
        )}
      />
      <LineGraph
        labels={cfLabelConfig}
        // processData={processCashFlow}
        annualData={processCashFlow(cashFlowData.annualReports)}
        quarterlyData={processCashFlow(cashFlowData.quarterlyReports).slice(
          maxQuarterLength * -1
        )}
        title="Cash Flow Breakdown"
      />
    </div>
  );
}
