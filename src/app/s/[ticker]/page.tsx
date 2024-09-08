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
import Pokemon from "./Pokemon";
import { Suspense } from "react";

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
    // Handle the error here, maybe throw it further or display a user message
  }
};

// const fetchPokemon = async (id: string) => {
//   console.log("Fetching data");
//   await new Promise((resolve) => {
//     setTimeout(resolve, 4000);
//   });
//   const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
//   const data = await res.json();
//   console.log("deta fetched completed after 3 seconds");
//   return data;
// };

// maybe extract ticker using useParams ?? since this is a client component
export default async function Page({
  params: { ticker },
  searchParams,
}: PageProps) {
  // const apiData = await searchTicker("AMD", "PPKPXKM833IA91DE");
  const maxQuarterLength = Math.min(tsla.quarterlyReports.length, 15);
  return (
    <div className="max-w-5xl mx-auto space-y-2 mt-2">
      {/* <Pokemon pokemon={pokemon} /> */}

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
        // apiData={tsla}
        // processData={processOperatingExpenses}
      />
      <BarGraph
        labels={fcfLabelConfig}
        title={"Free Cash Flow"}
        // processData={processFCF}
        annualData={processFCF(tslaCashFlow.annualReports)}
        quarterlyData={processFCF(tslaCashFlow.quarterlyReports).slice(
          maxQuarterLength * -1
        )}
        // apiData={tslaCashFlow}
      />
      <LineGraph
        labels={cfLabelConfig}
        // processData={processCashFlow}
        annualData={processCashFlow(tslaCashFlow.annualReports)}
        quarterlyData={processCashFlow(tslaCashFlow.quarterlyReports).slice(
          maxQuarterLength * -1
        )}
        title="Cash Flow Breakdown"
        // apiData={tslaCashFlow}
      />
    </div>
  );
}
