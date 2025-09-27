interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <div className="md:mb-6 mb-4 md:mt-0 mt-12">
      <h1 className="md:text-3xl text-2xl font-bold text-light-text dark:text-dark-text">
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
