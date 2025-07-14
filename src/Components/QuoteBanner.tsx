import quotes from "../utils/quotes";

const QuoteBanner = () => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="mb-6 p-4 rounded-lg card border-l-4 border-accent dark:border-dark-accent">
      <p className="text-lg font-semibold mb-1 text-accent dark:text-dark-accent">
        “{quote.text}”
      </p>
      <p className="text-sm text-light-muted dark:text-dark-muted">
        — {quote.author}
      </p>
    </div>
  );
};

export default QuoteBanner;
