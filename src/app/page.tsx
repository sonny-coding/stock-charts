import Search from "@/components/search/Search";
import SearchResults from "@/components/search/SearchResults";

const page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) => {
  const query = searchParams?.query || "";

  return (
    <main className="flex-grow container mx-auto px-4 py-8 max-h-screen">
      <div className="max-w-2xl mx-auto">
        <p className="text-3xl font-bold text-center mb-8">
          Visialize <span className="text-[#e76e50]">Fundamentals</span>
        </p>
        <div className="flex flex-col items-center space-x-2">
          <Search placeholder="Search..." />
          <SearchResults query={query} />

          {/* <DialogDemo query={query} /> */}
        </div>
      </div>
    </main>
  );
};

export default page;
