import { SubmitHandler, useForm } from "react-hook-form";
import { Task, useAddTaskMutation, useUpdateTaskMutation } from "./taskApi";
import { Input } from "../../Components/ui/Input";
import { Button } from "../../Components/ui/Button";
import { showToast } from "../../Components/ui/Toast";

interface TaskFormProps {
  setIsOpen: (isOpen: boolean) => void;
  task?: Partial<Task>;
}

type TaskFormInput = {
  title: string;
  description: string;
  dueDate?: string;
  priority?: "low" | "medium" | "high";
  isCompleted?: boolean;
};

export const TaskForm: React.FC<TaskFormProps> = ({ setIsOpen, task }) => {
  const isEdit = Boolean(task && task._id);
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useForm<TaskFormInput>({
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      dueDate: task?.dueDate?.slice(0, 10) || "",
      priority: task?.priority || "medium",
      isCompleted: task?.isCompleted || false,
    },
  });

  const onSubmit: SubmitHandler<TaskFormInput> = async (data) => {
    try {
      if (isEdit && task?._id) {
        await updateTask({ id: task._id, data });
        showToast.success("Task updated successfully!");
      } else {
        await addTask(data);
        showToast.success("Task added successfully!");
      }
      setIsOpen(false);
    } catch (error: any) {
      showToast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="flex flex-col gap-4 md:px-4 md:py-2">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="title"
            className="text-sm font-medium text-light-text dark:text-dark-text"
          >
            Title
          </label>
          <Input
            id="title"
            placeholder="Enter title"
            {...register("title", { required: "Title is required" })}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="description"
            className="text-sm font-medium text-light-text dark:text-dark-text"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={5}
            placeholder="Write your task description..."
            className="rounded-md border border-light-border dark:border-dark-border dark:bg-dark-bg text-sm text-light-text dark:text-dark-text px-3 py-2 resize-none outline-none focus:ring-2 focus:ring-accent dark:focus:ring-dark-accent focus:placeholder-transparent"
            {...register("description", {
              required: "Description is required",
            })}
          />
        </div>

        {/* Priority */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="priority"
            className="text-sm font-medium text-light-text dark:text-dark-text"
          >
            Priority
          </label>
          <select
            id="priority"
            {...register("priority")}
            className="rounded-md border border-light-border dark:border-dark-border dark:bg-dark-bg text-sm text-light-text dark:text-dark-text px-3 py-2 outline-none focus:ring-2 focus:ring-accent dark:focus:ring-dark-accent"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Due Date */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="dueDate"
            className="text-sm font-medium text-light-text dark:text-dark-text"
          >
            Due Date
          </label>
          <Input type="date" id="dueDate" {...register("dueDate")} />
        </div>

        {/* Completion */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isCompleted"
            {...register("isCompleted")}
            className="w-4 h-4 text-accent dark:text-dark-accent rounded"
          />
          <label
            htmlFor="isCompleted"
            className="text-sm text-light-text dark:text-dark-text"
          >
            Mark as {task?.isCompleted ? "Incomplete" : "Complete"}
          </label>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting || !isDirty}>
            {isSubmitting ? "Saving..." : isEdit ? "Update Task" : "Add Task"}
          </Button>
        </div>
      </div>
    </form>
  );
};
