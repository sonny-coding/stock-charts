import Link from "next/link";
import HeaderTicker from "./HeaderTicker";
import { BarChart2 } from "lucide-react";
import { getAuth } from "@/features/auth/queries/get-auth";
import AuthNav from "./AuthNav";
// import { signOut } from "@/features/auth/actions/sign-out";

const Header = async () => {
  const { user } = await getAuth();
  const tickers = ["AAPL", "GOOGL", "AMZN", "MSFT", "TSLA"];

  return (
    <header className="bg-muted text-primary-foreground py-4">
      <div className="container mx-auto px-4 text-black">
        <div className="flex justify-between items-center">
          <Link href={"/"} className="flex-shrink-0 flex items-center">
            <BarChart2 className="h-8 w-8 text-[#e76e50]" />
            <span className="ml-2 text-xl font-bold text-gray-800">
              ChartCrunch
            </span>
          </Link>
          {user && (
            <Link className="text-sky-600" href="/dashboard">
              Dashboard
            </Link>
          )}
          {/* <Link className="text-black" href="/sign-up">
            Sign Up
          </Link>
          <Link className="text-black" href="/sign-in">
            Sign In
          </Link>
          <form action={signOut}>
            <button className="text-black" type="submit">
              Sign Out
            </button>
          </form>  */}
          {/* <HeaderTicker tickers={tickers} /> */}
          <AuthNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
