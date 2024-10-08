// import { stockSymbols } from "@/data";
import Link from "next/link";

const apiSearchSymbols = async (query: string, apiKey: string) => {
  try {
    const res = await fetch(
      `https://twelve-data1.p.rapidapi.com/symbol_search?symbol=${query}&outputsize=3`,
      {
        headers: {
          "x-rapidapi-key": apiKey,
          // "x-rapidapi-host": "twelve-data1.p.rapidapi.com",
        },
      }
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// const searchSymbols = async (query: string, apiKey: string) => {
//   const localResults = stockSymbols.filter((symbol) => {
//     const nameMatch = symbol.name.toLowerCase().includes(query.toLowerCase());
//     const symbolMatch = symbol.symbol
//       .toLowerCase()
//       .includes(query.toLowerCase());
//     return nameMatch || symbolMatch;
//   });
//   if (localResults.length === 0) {
//   }

//   return localResults.slice(0, 5);
// };

const SearchResults = async ({ query }: { query: string }) => {
  if (query === "") {
    return <div></div>;
  }

  const results = await apiSearchSymbols(
    query,
    process.env.X_RAPIDAPI_KEY as string
  );

  return (
    <div className="mt-4 w-full">
      {results.length > 0 ? (
        <>
          <h3 className="text-lg font-semibold mb-2">Matching Stocks:</h3>
          <ul className="space-y-2">
            {results.map((result: any, index: number) => (
              <Link
                key={index}
                href={`/s/${result.symbol}`}
                className="block bg-white hover:bg-gray-50 p-3 rounded-lg shadow-sm transition-all duration-200 ease-in-out transform hover:scale-102 hover:shadow-md"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">
                    {result.instrument_name}
                  </span>
                  <span className="text-[#e76e50] font-semibold">
                    {result.symbol}
                  </span>
                </div>
              </Link>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-center p-4 text-gray-500">No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
