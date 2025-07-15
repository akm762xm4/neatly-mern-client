import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useGetMeQuery } from "../../features/user/usersApi";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from "../Modal";
import { showToast } from "../ui/Toast";

const pills = ["profile", "theme", "logout"] as const;

export const NowBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: user } = useGetMeQuery();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  const handleThemeToggle = (mode: "light" | "dark") => {
    setTheme(mode);
    document.documentElement.classList.toggle("dark", mode === "dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogoutConfirmOpen(false);
    navigate("/auth", { replace: true });
    showToast.success("Logged out successfully");
  };

  const pill = pills[activeIndex];

  const swipeHandlers = {
    onDragEnd: (_: any, info: { offset: { y: number } }) => {
      if (info.offset.y < -50) {
        setActiveIndex((prev) => (prev + 1) % pills.length);
      } else if (info.offset.y > 50) {
        setActiveIndex((prev) => (prev - 1 + pills.length) % pills.length);
      }
    },
  };

  return (
    <>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <div className="relative w-48 h-20 overflow-hidden rounded-full card">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={pill}
              className="absolute inset-0 bg-light-card dark:bg-dark-card rounded-2xl shadow-lg  flex flex-col items-center justify-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              {...swipeHandlers}
            >
              {pill === "profile" && (
                <div className="flex flex-row  items-center ">
                  <img
                    src={`https://ui-avatars.com/api/?name=${user?.username}`}
                    alt="avatar"
                    className="w-10 h-10 rounded-full mb-2"
                  />
                  <span className="flex flex-col ml-2">
                    <p className="text-sm font-medium text-light-text dark:text-dark-text mr-auto">
                      {user?.username || "Anonymous"}
                    </p>
                    <p className="text-xs text-light-muted dark:text-dark-muted">
                      {user?.email || "user@example.com"}
                    </p>
                  </span>
                </div>
              )}

              {pill === "theme" && (
                <div className="flex justify-center gap-4 items-center">
                  <button
                    title="Light Mode"
                    onClick={() => handleThemeToggle("light")}
                    className={`p-2 rounded-full transition ${
                      theme === "light" ? "bg-gray-200 dark:bg-dark-muted" : ""
                    }`}
                  >
                    <Sun className="w-6 h-6 text-yellow-500" />
                  </button>
                  <button
                    title="Dark Mode"
                    onClick={() => handleThemeToggle("dark")}
                    className={`p-2 rounded-full transition ${
                      theme === "dark" ? "bg-gray-300 dark:bg-dark-muted" : ""
                    }`}
                  >
                    <Moon className="w-6 h-6 text-gray-500 dark:text-white" />
                  </button>
                </div>
              )}

              {pill === "logout" && (
                <button
                  onClick={() => setIsLogoutConfirmOpen(true)}
                  className="w-full h-full flex items-center justify-center bg-red-500 text-white text-sm font-semibold rounded-2xl hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {/* Confirm Logout */}
      {isLogoutConfirmOpen && (
        <Modal
          title="Confirm Logout"
          isOpen={isLogoutConfirmOpen}
          setIsOpen={setIsLogoutConfirmOpen}
          child={
            <p className="md:px-6 px-3 md:text-base text-sm">
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
