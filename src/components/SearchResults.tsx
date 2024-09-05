import { stockSymbols } from "@/data";

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
    <div className="container mx-auto px-4 py-6">
      {results.length > 0 ? (
        <ul className="list-none p-0 m-0">
          {results.map((result) => (
            <li
              key={result.symbol}
              className="flex items-center justify-between p-2 border-b border-gray-200 cursor-pointer"
            >
              {result.name} ({result.symbol})
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center p-4 text-gray-500">No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
