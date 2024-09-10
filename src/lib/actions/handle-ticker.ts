"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@/features/auth/queries/get-auth";

export async function handleFavoriteStock(ticker: string) {
  try {
    const { session, user } = await getAuth();

    if (!session || !user) {
      throw new Error("You must be logged in to add a favorite stock");
    }

    const userId = user.id;

    // Check if the ticker already exists in favorites
    const existingStock = await prisma.favoriteStock.findFirst({
      where: { userId, ticker: ticker.toUpperCase() },
    });

    if (existingStock) {
      console.log(
        `Stock with ticker "${ticker}" already exists in favorites. Removing...`
      );
      await prisma.favoriteStock.delete({
        where: { id: existingStock.id },
      });
      revalidatePath("/", "layout");
      return;
    }

    // Fetch remaining favorite stocks (excluding the checked ticker)
    const favoriteStocks = await prisma.favoriteStock.findMany({
      where: { userId, NOT: { ticker: ticker.toUpperCase() } },
      orderBy: { createdAt: "asc" },
    });

    if (favoriteStocks.length >= 5) {
      // Remove the oldest stock
      const oldestStock = favoriteStocks[0];
      await prisma.favoriteStock.delete({
        where: { id: oldestStock.id },
      });
    }

    // Add the new favorite stock
    await prisma.favoriteStock.create({
      data: {
        ticker: ticker.toUpperCase(),
        userId,
      },
    });

    revalidatePath("/", "layout");
  } catch (error) {
    console.error("Failed to add favorite stock:", error);
    // return { success: false, error: error.message };
  }
}
