import { FileText, CheckSquare, Menu, X, LayoutDashboard } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { NowBar } from "./Layout/NowBar";
import Logo from "../assets/Neatly_Logo.png";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Collapse on route change (mobile only)
  useEffect(() => {
    if (window.innerWidth < 768) {
      setOpen(false);
    }
  }, [location]);

  // Collapse on outside click (mobile only)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        open &&
        window.innerWidth < 768 &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

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
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-light-bg dark:bg-dark-bg border-r border-light-border dark:border-dark-border p-4 flex flex-col justify-between transition-transform z-40 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Top Section */}
        <div className="md:mt-0 mt-12">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8 text-xl font-bold text-light-text dark:text-dark-text px-2">
            <img src={Logo} alt="Logo" className="w-8 h-8" />
            <span>Neatly</span>
          </div>
          <hr className="border-light-border dark:border-dark-border mb-6" />
          {/* Nav Items */}
          <nav className="flex flex-col gap-2">
            <NavItem
              to="/"
              icon={<LayoutDashboard className="w-5 h-5" />}
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

        {/* NowBar Section */}
        <div className="mt-6">
          <NowBar />
          <p className="mt-2 text-center text-xs text-light-muted dark:text-dark-muted">
            Swipe up or down to switch options
          </p>
        </div>
      </aside>
    </>
  );
};
