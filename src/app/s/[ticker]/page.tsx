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

const searchTicker = async (ticker: string, apiKey: string) => {
  try {
    const res = await fetch(
      `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${ticker}&apikey=${apiKey}`
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
  // const apiData = await searchTicker(
  //   ticker,
  //   process.env.ALPHA_VANTAGE_KEY as string
  // );
  const maxQuarterLength = Math.min(tsla.quarterlyReports.length, 15);
  return (
    <div className="max-w-5xl mx-auto space-y-2 mt-2">
      <Banner ticker={ticker} />
      <BarGraph
        labels={barLabelConfig}
        title={"Revenue & Earnings"}
        annualData={processData(tsla.annualReports)}
        quarterlyData={processData(
          tsla.quarterlyReports.slice(0, maxQuarterLength)
        )}
      />

      <LineGraph
        labels={marginLabelConfig}
        title="Margins"
        isPercent={true}
        annualData={processMargins(tsla.annualReports)}
        quarterlyData={processMargins(
          tsla.quarterlyReports.slice(0, maxQuarterLength)
        )}
      />
      <LineGraph
        labels={growthLabelConfig}
        title={"Growth"}
        annualData={processGrowth(tsla.annualReports)}
        quarterlyData={processGrowth(tsla.quarterlyReports).slice(
          0,
          maxQuarterLength
        )}
        isPercent={true}
      />

      <LineGraph
        annualData={processCostsOverRevenue(tsla.annualReports)}
        quarterlyData={processCostsOverRevenue(tsla.quarterlyReports).slice(
          maxQuarterLength * -1
        )}
        labels={costRatioLabelConfig}
        title="Expenses / Revenue"
        isPercent={true}
      />
      <LineBarComposedChart
        labels={composedLabelConfig}
        annualData={processOperatingExpenses(tsla.annualReports)}
        quarterlyData={processOperatingExpenses(tsla.quarterlyReports).slice(
          maxQuarterLength * -1
        )}
        title="Operating Expenses"
      />
      <BarGraph
        labels={fcfLabelConfig}
        title={"Free Cash Flow"}
        // processData={processFCF}
        annualData={processFCF(tslaCashFlow.annualReports)}
        quarterlyData={processFCF(tslaCashFlow.quarterlyReports).slice(
          maxQuarterLength * -1
        )}
      />
      <LineGraph
        labels={cfLabelConfig}
        // processData={processCashFlow}
        annualData={processCashFlow(tslaCashFlow.annualReports)}
        quarterlyData={processCashFlow(tslaCashFlow.quarterlyReports).slice(
          maxQuarterLength * -1
        )}
        title="Cash Flow Breakdown"
      />
    </div>
  );
}
