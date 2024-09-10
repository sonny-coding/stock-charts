import React, { Suspense } from "react";

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

const Banner = async ({ ticker }: BannerProps) => {
  const { user } = await getAuth();
  const isFavorite = await isTickerInFavorites(ticker);
  return (
    <Card className="">
      <CardHeader>
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
      </CardHeader>
    </Card>
  );
};

export default Banner;
