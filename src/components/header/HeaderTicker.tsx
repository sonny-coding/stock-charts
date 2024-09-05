"use client";

import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

type HeaderTickerProps = {
  tickers: string[];
};

const HeaderTicker = ({ tickers }: HeaderTickerProps) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const handleClick = (term: string) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <ul className="flex gap-5">
      {tickers.map((ticker) => (
        <Link
          href={`/s/${ticker}`}
          className="hover:cursor-pointer text-sm font-medium"
          key={ticker}
          //   onClick={() => handleClick(ticker)}
        >
          {ticker}
        </Link>
      ))}
    </ul>
  );
};

export default HeaderTicker;
