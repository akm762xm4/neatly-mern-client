// components/Sidebar.tsx
import { FileText, CheckSquare, Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Modal } from "./Modal";
import { NowBar } from "./Layout/NowBar";
import { showToast } from "./ui/Toast";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogoutConfirmOpen(false);
    showToast.success("Logged out successfully");
    navigate("/auth", { replace: true });
  };

  const NavItem = ({
    to,
    icon,
    label,
  }: {
    to: string;
    icon: JSX.Element;
    label: string;
  }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition ${
          isActive
            ? "bg-accent/10 text-accent dark:text-dark-accent"
            : "hover:bg-light-card dark:hover:bg-dark-card text-light-muted dark:text-dark-muted"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-md bg-light-bg dark:bg-dark-card border border-light-border dark:border-dark-border"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-light-bg dark:bg-dark-bg border-r border-light-border dark:border-dark-border p-4 flex flex-col justify-between transition-transform z-40 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Top Section */}
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8 text-xl font-bold text-light-text dark:text-dark-text px-2">
            <CheckSquare className="text-accent dark:text-dark-accent" />
            <span>Neatly</span>
          </div>

          {/* Nav Items */}
          <nav className="flex flex-col gap-2">
            <NavItem
              to="/"
              icon={<FileText className="w-5 h-5" />}
              label="Overview"
            />
            <NavItem
              to="/notes"
              icon={<FileText className="w-5 h-5" />}
              label="Notes"
            />
            <NavItem
              to="/tasks"
              icon={<CheckSquare className="w-5 h-5" />}
              label="Tasks"
            />
          </nav>
        </div>

        {/* Bottom NowBar Section */}
        <div className="mt-6">
          <NowBar />
          <p className="mt-2 text-center text-xs text-light-muted dark:text-dark-muted">
            Swipe up or down to switch options
          </p>
        </div>
      </aside>

      {/* Confirm Logout */}
      {isLogoutConfirmOpen && (
        <Modal
          title="Confirm Logout"
          isOpen={isLogoutConfirmOpen}
          setIsOpen={setIsLogoutConfirmOpen}
          child={
            <p className="text-light-text dark:text-dark-text text-sm">
              Are you sure you want to log out?
            </p>
          }
          deleteHandler={handleLogout}
          deleteButtonText="Logout"
        />
      )}
    </>
  );
};
