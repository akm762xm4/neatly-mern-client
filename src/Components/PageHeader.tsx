interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-light-text dark:text-dark-text">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm sm:text-base mt-1 text-light-muted dark:text-dark-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
