import Link from "next/link";
import HeaderTicker from "./HeaderTicker";
import { BarChart2 } from "lucide-react";
import SearchDialog from "./SearchDialog";

const Header = () => {
  const tickers = ["AAPL", "GOOGL", "AMZN", "MSFT", "TSLA"];

  return (
    <header className="bg-muted text-primary-foreground py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href={"/"} className="flex-shrink-0 flex items-center">
            <BarChart2 className="h-8 w-8 text-[#e76e50]" />
            <span className="ml-2 text-xl font-bold text-gray-800">
              ChartCrunch
            </span>
          </Link>
          <HeaderTicker tickers={tickers} />
        </div>
      </div>
    </header>
  );
};

export default Header;
