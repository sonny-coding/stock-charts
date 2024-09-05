import Link from "next/link";
import HeaderTicker from "./header/HeaderTicker";

const Header = () => {
  const tickers = ["AAPL", "GOOGL", "AMZN", "MSFT", "TSLA"];

  return (
    <header className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href={"/"} className="text-3xl font-bold">
            MyChart
          </Link>
          <HeaderTicker tickers={tickers} />
        </div>
      </div>
    </header>
  );
};

export default Header;
