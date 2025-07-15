import { useGetOverviewQuery } from "../overview/overviewApi";
import { format } from "date-fns";
import { FileText, ClipboardList, Plus, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../Components/Modal";
import { TaskForm } from "../task/TaskForm";
import OverviewSkeleton from "./OverviewSkeleton";
import { NoteForm } from "../notes/NoteForm";

const getTimelineText = (entry: any) => {
  switch (entry.type) {
    case "task_completed":
      return `✅ Completed task “${entry.title}”`;
    case "task_due":
      return `⏰ Task “${entry.title}” is due`;
    case "note_added":
      return `📝 Added note “${entry.title}”`;
    case "note_edited":
      return `✏️ Edited note “${entry.title}”`;
    default:
      return `🔔 ${entry.title}`;
  }
};

const OverviewPage = () => {
  const { data, isLoading, error } = useGetOverviewQuery();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const navigate = useNavigate();

  const [theme, setTheme] = useState<"light" | "dark">(() =>
    localStorage.getItem("theme") === "dark" ||
    document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
  );

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  if (isLoading) return <OverviewSkeleton />;
  if (error)
    return <div className="text-red-500 px-4">Something went wrong!</div>;

  return (
    <>
      <div className="flex items-center justify-between gap-4 px-1 py-2 mb-4 md:mt-0 mt-12">
        <div>
          <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">
            Welcome back, {data?.user?.username || "Guest"} 👋
          </h1>
          <p className="text-sm text-light-muted dark:text-dark-muted">
            {format(currentTime, "eeee, dd MMM yyyy • hh:mm a")}
          </p>
        </div>

        <img
          src={`https://ui-avatars.com/api/?name=${data?.user?.username}`}
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>

      <div>
        {/* 🔹 Redesigned Summary Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {/* Notes Card */}
          <div className="card p-5 rounded-2xl shadow hover:shadow-md transition flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <FileText className="text-accent dark:text-dark-accent w-8 h-8" />
              <div className="text-right">
                <p className="text-2xl font-bold text-light-text dark:text-dark-text">
                  {data?.notes.total}
                </p>
                <p className="text-xs text-light-muted dark:text-dark-muted mt-1">
                  Total Notes
                </p>
              </div>
            </div>
            <div className="pt-3 border-t mt-3 border-light-muted dark:border-dark-muted text-right">
              <button
                onClick={() => navigate("/notes")}
                className="text-xs text-light-muted dark:text-dark-muted font-semibold hover:underline"
              >
                See All →
              </button>
            </div>
          </div>

          {/* Tasks Card */}
          <div className="card p-5 rounded-2xl shadow hover:shadow-md transition flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <ClipboardList className="text-accent dark:text-dark-accent w-8 h-8" />
              <div className="text-right">
                <p className="text-2xl font-bold text-light-text dark:text-dark-text">
                  {data?.tasks.total}
                </p>
                <p className="text-xs text-light-muted dark:text-dark-muted mt-1">
                  Total Tasks
                </p>
              </div>
            </div>
            <div className="pt-3 border-t border-light-muted dark mt-3 text-right">
              <button
                onClick={() => navigate("/tasks")}
                className="text-xs text-light-muted dark:text-dark-muted font-semibold hover:underline"
              >
                See All →
              </button>
            </div>
          </div>
        </div>

        {/* 🔸 Tasks Summary Section */}
        <h2 className="md:text-2xl text-xl font-semibold text-light-text dark:text-dark-text px-1 mb-4">
          Tasks Summary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
          {/* ✅ Completed */}
          <div className="card rounded-2xl p-4 flex items-center gap-4 shadow-md">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <span className="text-green-600 dark:text-green-300 text-xl">
                ✅
              </span>
            </div>
            <div>
              <p className="md:text-xl text-lg font-bold text-light-text dark:text-dark-text">
                {data?.tasks.completed}
              </p>
              <p className="md:text-sm text-xs text-light-muted dark:text-dark-muted">
                Completed
              </p>
            </div>
          </div>

          {/* ⏳ Pending */}
          <div className="card rounded-2xl p-4 flex items-center gap-4 shadow-md">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
              <span className="text-yellow-600 dark:text-yellow-300 text-xl">
                ⏳
              </span>
            </div>
            <div>
              <p className="md:text-xl text-lg font-bold text-light-text dark:text-dark-text">
                {data?.tasks.pending}
              </p>
              <p className="md:text-sm text-xs text-light-muted dark:text-dark-muted">
                Pending
              </p>
            </div>
          </div>

          {/* 🔥 Overdue */}
          <div className="card rounded-2xl p-4 flex items-center gap-4 shadow-md">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
              <span className="text-red-600 dark:text-red-300 text-xl">🔥</span>
            </div>
            <div>
              <p className="md:text-xl text-lg font-bold text-light-text dark:text-dark-text">
                {data?.tasks.dueDates.length}
              </p>
              <p className="md:text-sm text-xs text-light-muted dark:text-dark-muted">
                Overdue
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="card rounded-2xl shadow p-4">
            <h3 className="text-md font-semibold mb-3 text-light-text dark:text-dark-text">
              Task Calendar
            </h3>
            <Calendar
              tileClassName={({ date }) => {
                const isDue = data?.tasks?.dueDates?.some(
                  (d: string) =>
                    new Date(d).toDateString() === date.toDateString()
                );
                return isDue
                  ? "bg-accent hover:bg-light-bg hover:dark:bg-dark-bg text-white transition rounded-full"
                  : "hover:bg-light dark:hover:bg-dark-bg transition rounded-full";
              }}
              className="w-full bg-transparent text-sm "
            />
          </div>

          <div className="card rounded-2xl shadow p-4 flex flex-col gap-4">
            <h3 className="text-md font-semibold  text-light-text dark:text-dark-text">
              Quick Actions
            </h3>

            {/* 🔹 Top Buttons - Add Note & Add Task */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setIsAddNoteOpen(true)}
                className="md:text-base text-sm rounded-xl p-4 flex flex-col shadow hover:shadow-md  items-center justify-center quick-action-btn h-32 bg-light-bg dark:bg-dark-bg hover:scale-105 transition text-light-muted dark:text-dark-muted"
              >
                <Plus className="md:w-10 md:h-10 w-8 h-8 text-accent dark:text-dark-accent" />
                Add Note
              </button>

              <button
                onClick={() => setIsAddTaskOpen(true)}
                className="md:text-base text-sm rounded-xl p-4 flex flex-col shadow hover:shadow-md  items-center justify-center quick-action-btn h-32 bg-light-bg dark:bg-dark-bg hover:scale-105 transition text-light-muted dark:text-dark-muted"
              >
                <Plus className="md:w-10 md:h-10 w-8 h-8 text-accent dark:text-dark-accent" />
                Add Task
              </button>
            </div>

            {/* 🔸 Redesigned Bottom Buttons - Dual Cards (Theme + Navigation) */}
            <div className="grid grid-cols-2 gap-4">
              {/* Toggle Theme Card */}
              <div className="bg-light-bg dark:bg-dark-bg rounded-xl md:p-4 p-2 flex flex-col justify-between shadow hover:shadow-md transition">
                <div className="grid grid-cols-2 gap-2 my-3 md:p-4 p-2 place-items-center">
                  <Moon className="w-8 h-8 text-accent dark:text-dark-accent" />
                  <Sun className="w-8 h-8 text-accent dark:text-dark-accent" />
                </div>
                <button
                  onClick={handleThemeToggle}
                  className="w-full py-2 text-center md:text-sm text-xs font-medium text-light-text dark:text-dark-text bg-light-card dark:bg-dark-card rounded-md shadow-sm hover:scale-[1.02] transition"
                >
                  Toggle Theme
                </button>
              </div>

              {/* Navigation Card */}
              <div className="bg-light-bg dark:bg-dark-bg rounded-xl md:p-4 p-2 flex flex-col justify-between shadow hover:shadow-md transition">
                <div className="text-sm font-semibold text-light-text dark:text-dark-text mb-3 md:p-0 p-1">
                  Navigate to..
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                  <button
                    onClick={() => navigate("/notes")}
                    className="flex items-center justify-center gap-1 py-2 rounded-md bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text shadow-sm hover:scale-[1.02] transition md:text-sm text-xs"
                  >
                    <ClipboardList className="text-accent dark:text-dark-accent w-6 h-6" />
                    notes
                  </button>
                  <button
                    onClick={() => navigate("/tasks")}
                    className="flex items-center justify-center gap-1 py-2 rounded-md bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text shadow-sm hover:scale-[1.02] transition text-sm"
                  >
                    <FileText className="text-accent dark:text-dark-accent w-6 h-6" />
                    tasks
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🔹 Recent Timeline Section */}
        <div className="mt-10 card">
          <h2 className="md:text-2xl text-xl font-semibold text-light-text dark:text-dark-text mb-4 ">
            Recent Activity
          </h2>
          <div className="space-y-4 max-h-96 overflow-y-auto  p-2">
            {data?.recentTimeline?.map((entry: any, index: number) => (
              <div key={index} className="relative pl-6 card">
                <div className="absolute -left-2 -top-2 w-5 h-5 bg-accent dark:bg-dark-accent rounded-full"></div>
                <div>
                  <p className="text-sm text-light-text dark:text-dark-text">
                    {getTimelineText(entry)}
                  </p>
                  <p className="text-xs text-light-muted dark:text-dark-muted">
                    {format(new Date(entry.date), "dd MMM, yyyy • hh:mm a")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isAddNoteOpen && (
        <Modal
          title="Add Note"
          isOpen={isAddNoteOpen}
          setIsOpen={setIsAddNoteOpen}
          child={<NoteForm setIsOpen={setIsAddNoteOpen} />}
        />
      )}
      {/* 🧩 Add Task Modal */}
      {isAddTaskOpen && (
        <Modal
          title="Add Task"
          isOpen={isAddTaskOpen}
          setIsOpen={setIsAddTaskOpen}
          child={<TaskForm setIsOpen={setIsAddTaskOpen} />}
        />
      )}
    </>
  );
};

export default OverviewPage;
