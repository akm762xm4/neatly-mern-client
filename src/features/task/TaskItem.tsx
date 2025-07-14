import {
  Task,
  useDeleteTaskMutation,
  useToggleCompleteMutation,
} from "./taskApi";
import { useState } from "react";
import { Modal } from "../../Components/Modal";
import { TaskForm } from "./TaskForm";
import { format } from "date-fns";
import { CheckCircle, Circle, Trash2, Pencil } from "lucide-react";
import { showToast } from "../../Components/ui/Toast";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [deleteTask, { isLoading }] = useDeleteTaskMutation();
  const [toggleComplete] = useToggleCompleteMutation();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleDelete = async () => {
    await deleteTask(task._id);
    setIsAlertOpen(false);
    showToast.success("Task deleted successfully!");
  };

  const handleToggleComplete = async (taskId: string) => {
    await toggleComplete(taskId);
    showToast.success(
      task.isCompleted
        ? `Task '${task.title}' marked as incomplete!`
        : `Task '${task.title}' completed!`
    );
  };

  return (
    <div
      className={`relative group border-l-4 rounded-xl p-4 transition-shadow shadow-sm hover:shadow-lg bg-light-card dark:bg-dark-card ${
        task.isCompleted
          ? "border-green-500"
          : "border-yellow-400 dark:border-yellow-500"
      }`}
    >
      {/* Top Row */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <button
            onClick={() => handleToggleComplete(task._id)}
            className="text-accent dark:text-dark-accent mt-1"
            title="Toggle Complete"
          >
            {task.isCompleted ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>

          <div>
            <h3
              className={`text-base font-semibold ${
                task.isCompleted
                  ? "line-through text-gray-500 dark:text-gray-400"
                  : "text-light-text dark:text-dark-text"
              }`}
            >
              {task.title}
            </h3>
            <p className="text-xs text-light-muted dark:text-dark-muted">
              Due:{" "}
              {task.dueDate
                ? format(new Date(task.dueDate), "dd MMM yyyy")
                : "No deadline"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditOpen(true)}
            className="text-blue-500 hover:text-blue-600"
            title="Edit Task"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsAlertOpen(true)}
            className="text-red-500 hover:text-red-600"
            title="Delete Task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Middle: Description */}
      <p className="text-sm mt-2 text-light-muted dark:text-dark-muted">
        {task.description || "No description provided."}
      </p>

      {/* Bottom: Meta Info */}
      <div className="flex justify-between items-center mt-3 text-xs text-gray-500 dark:text-gray-400">
        <span>Priority: {task.priority || "N/A"}</span>
        <span>
          Created: {format(new Date(task.createdAt), "dd MMM yyyy, hh:mm a")}
        </span>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <Modal
          title="Edit Task"
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          child={<TaskForm setIsOpen={setIsEditOpen} task={task} />}
        />
      )}

      {/* Delete Confirmation */}
      {isAlertOpen && (
        <Modal
          title="Delete Task!"
          isOpen={isAlertOpen}
          setIsOpen={setIsAlertOpen}
          child={
            <div className="px-6 text-sm">
              Are you sure you want to delete the task “{task.title}”?
            </div>
          }
          deleteHandler={handleDelete}
          isDeleting={isLoading}
        />
      )}
    </div>
  );
};

export default TaskItem;
