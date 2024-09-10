import { prisma } from "@/lib/prisma";
import { getAuth } from "@/features/auth/queries/get-auth";
import Link from "next/link";

async function getFavoriteStocks() {
  const { user } = await getAuth();
  if (!user) {
    return [];
  }

  return prisma.favoriteStock.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
}

const HeaderTickers = async () => {
  const favoriteStocks = await getFavoriteStocks();
  // if (favoriteStocks.length === 0) {
  //   return <p>You haven&apos;t added any favorite stocks yet.</p>;
  // }

  return (
    <ul className="flex gap-5 text-foreground">
      {favoriteStocks.map((stock) => (
        <Link
          href={`/s/${stock.ticker}`}
          className="hover:cursor-pointer text-sm font-medium hover:opacity-70"
          key={stock.id}
          //   onClick={() => handleClick(stock)}
        >
          {stock.ticker}
        </Link>
      ))}
    </ul>
  );
};

export default HeaderTickers;
