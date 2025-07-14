import { Sidebar } from "../Sidebar";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
      <Sidebar />

      <main className="ml-0 md:ml-64 flex-1 p-4 md:px-[10%]  md:p-6">
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;
