import * as React from "react";
import { useGetQuoteQuery } from "../features/dashboard/dashboardApi";
import Skeleton from "./ui/Skeleton";

const QuoteBanner = () => {
  const { data: quote, isLoading } = useGetQuoteQuery();
  const parsedQuote: { text: string; author: string } = quote
    ? JSON.parse(quote.quote as unknown as string)
    : null;

  if (!parsedQuote || isLoading || !quote) {
    return (
      <div className="card space-y-3 md:mb-6 mb-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    );
  }

  return (
    <div className="md:mb-6 mb-4 md:p-4 p-3 rounded-lg card border-l-4 border-accent dark:border-dark-accent">
      <p className="md:text-base text-sm font-semibold mb-1 text-accent dark:text-dark-accent">
        “{parsedQuote.text}”
      </p>
      <p className="md:text-sm text-xs text-light-muted dark:text-dark-muted">
        — {parsedQuote.author}
      </p>
    </div>
  );
};

export default React.memo(QuoteBanner);
