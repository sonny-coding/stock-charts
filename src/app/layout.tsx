import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { montserrat } from "@/app/ui/fonts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stock Chart Pro", // Replace with your app's name
  description: "Visualize financial data.",
  keywords: [
    "stock chart",
    "stock analysis",
    "financial data",
    "technical analysis",
    "investment",
    "trading",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow py-2">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
