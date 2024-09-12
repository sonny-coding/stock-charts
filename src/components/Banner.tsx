import { Card, CardHeader } from "./ui/card";
import { Star } from "lucide-react";
import { handleFavoriteStock } from "@/lib/actions/handle-ticker";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@/features/auth/queries/get-auth";

type BannerProps = {
  ticker: string;
};

const isTickerInFavorites = async (ticker: string) => {
  try {
    const { user } = await getAuth();
    if (!user) {
      return false;
    }

    const existingStock = await prisma.favoriteStock.findFirst({
      where: { userId: user.id, ticker: ticker.toUpperCase() },
    });

    return !!existingStock;
  } catch (error) {
    console.error("Failed to check if ticker is in favorites:", error);
    return false;
  }
};

const fetchProfile = async (ticker: string, apiKey: string) => {
  const res = await fetch(
    `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/modules?ticker=${ticker}&module=asset-profile`,
    {
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
      },
    }
  );
  const data = await res.json();
  // console.log("🚀 ~ fetchProfile ~ data:", data);
  return data;
};

const Banner = async ({ ticker }: BannerProps) => {
  const { user } = await getAuth();
  const profile = await fetchProfile(
    ticker,
    process.env.X_RAPIDAPI_KEY as string
  );
  const isFavorite = await isTickerInFavorites(ticker);
  return (
    <Card className="">
      <CardHeader className="flex flex-row justify-between items-center">
        <form className="" action={handleFavoriteStock.bind(null, ticker)}>
          <button
            type="submit"
            className="group flex gap-1 flex-row items-center font-semibold text-xl hover:cursor-pointer"
          >
            {ticker.toUpperCase()}
            {user && (
              <Star
                className={`text-yellow-300 h-4 w-4 ${
                  isFavorite ? "fill-yellow-300" : ""
                } group-hover:fill-yellow-300`}
              />
            )}
          </button>
        </form>

        <div className="flex-row gap-7 flex">
          <div className="text-center hidden sm:block">
            <p className="text-gray-400 text-sm">SECTOR</p>
            <p>{profile?.body?.sectorDisp}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">INDUSTRY</p>
            <p>{profile?.body?.industryDisp}</p>
          </div>
          <div className="text-center hidden sm:block">
            <p className="text-gray-400 text-sm">EMPLOYEES</p>
            <p>{profile?.body?.fullTimeEmployees}</p>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default Banner;
