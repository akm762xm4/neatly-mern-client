import { useState, useMemo } from "react";
import { useGetTasksQuery } from "./taskApi";
import TaskItem from "./TaskItem";
import { Modal } from "../../Components/Modal";
import { TaskForm } from "./TaskForm";
import { Plus, Search, X } from "lucide-react";
import { Input } from "../../Components/ui/Input";
import SkeletonTaskCard from "./SkeletonTaskCard";
import PageHeader from "../../Components/PageHeader";
import NoData from "../../Components/NoData";

const TaskList = () => {
  const { data: tasks, isLoading, isFetching } = useGetTasksQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("all");

  const filteredTasks = useMemo(() => {
    if (!searchTerm.trim()) return tasks;
    const lower = searchTerm.toLowerCase();
    return tasks?.filter(
      (task) =>
        task.title.toLowerCase().includes(lower) ||
        task.description.toLowerCase().includes(lower)
    );
  }, [searchTerm, tasks]);

  return (
    <>
      <PageHeader
        title="My Tasks"
        subtitle="Manage your tasks efficiently and stay organized."
      />

      {/* 🔧 Filter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* 📅 Date Filter */}
        <select
          title="Filter tasks by date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full sm:w-auto text-sm rounded-md border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-card text-gray-700 dark:text-gray-200 px-3 py-2 focus:ring-2 focus:ring-accent dark:focus:ring-dark-accent transition"
        >
          <option value="all">All Dates</option>
          <option value="today">Today</option>
          <option value="thisWeek">This Week</option>
          <option value="overdue">Overdue</option>
        </select>

        {/* 🔍 Search */}
        <div className="relative w-full sm:w-72 ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 z-10" />
          <Input
            id="task-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tasks..."
            className="pl-10"
          />
          <X
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 cursor-pointer"
            onClick={() => setSearchTerm("")}
            style={{ display: searchTerm ? "block" : "none" }}
          />
        </div>

        {/* ➕ Add Task Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-primary flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      {tasks?.length === 0 && (
        <NoData type="task" onAdd={() => setIsOpen(true)} />
      )}

      {/* 📦 Task Grid */}
      {isLoading || isFetching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonTaskCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-10">
          {filteredTasks?.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      )}

      {/* 🧩 Add Task Modal */}
      {isOpen && (
        <Modal
          title="Add Task"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          child={<TaskForm setIsOpen={setIsOpen} />}
        />
      )}
    </>
  );
};

export default TaskList;
