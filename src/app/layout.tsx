import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
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
      <body
        className={`${montserrat.className} antialiased w-full min-h-screen`}
      >
        <Header />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
