import Link from "next/link";
import { BarChart2 } from "lucide-react";
import { getAuth } from "@/features/auth/queries/get-auth";
import AuthNav from "./AuthNav";
import HeaderTickers from "./HeaderTickers";

const Header = async () => {
  const { user } = await getAuth();

  return (
    <header className="bg-secondary text-primary-foreground py-2">
      <div className="container mx-auto px-4 text-black">
        <div className="flex justify-between items-center">
          <Link href={"/"} className="flex-shrink-0 flex items-center">
            <BarChart2 className="h-8 w-8 text-[#e76e50]" />
            <span className="ml-2 text-xl font-bold text-gray-800">
              ChartCrunch
            </span>
          </Link>
          {user && <HeaderTickers />}
          <AuthNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
