import * as React from "react";
import quotes from "../utils/quotes";

const QuoteBanner = () => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="mb-6 p-4 rounded-lg card border-l-4 border-accent dark:border-dark-accent">
      <p className="md:text-lg text-md font-semibold mb-1 text-accent dark:text-dark-accent">
        “{quote.text}”
      </p>
      <p className="md:text-sm text-xs text-light-muted dark:text-dark-muted">
        — {quote.author}
      </p>
    </div>
  );
};

export default React.memo(QuoteBanner);
