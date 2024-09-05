import { stockSymbols } from "@/data";
import Link from "next/link";

const handleSearch = (query: string) => {
  const filteredSymbols = stockSymbols.filter((symbol) => {
    const nameMatch = symbol.name.toLowerCase().includes(query.toLowerCase());
    const symbolMatch = symbol.symbol
      .toLowerCase()
      .includes(query.toLowerCase());
    return nameMatch || symbolMatch;
  });
  return filteredSymbols.slice(0, 5);
};

const SearchResults = ({ query }: { query: string }) => {
  if (query === "") {
    return <div></div>;
  }

  const results = handleSearch(query);

  return (
    <div className="mt-4 w-full">
      {results.length > 0 ? (
        <>
          <h3 className="text-lg font-semibold mb-2">Matching Stocks:</h3>
          <ul className="space-y-2">
            {results.map((result) => (
              <Link
                href={`/s/${result.symbol}`}
                key={result.symbol}
                className="bg-muted hover:bg-cyan-50 p-2 rounded flex justify-between items-center cursor-pointer"
              >
                {result.name} ({result.symbol})
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
