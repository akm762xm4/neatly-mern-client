import { FileText, ClipboardList, Plus } from "lucide-react";
import { Button } from "./ui/Button"; // your reusable button
import { useNavigate } from "react-router-dom";

interface NoDataProps {
  type: "note" | "task";
  onAdd?: () => void;
}

const NoData: React.FC<NoDataProps> = ({ type, onAdd }) => {
  const navigate = useNavigate();

  const title = type === "note" ? "No Notes Yet" : "No Tasks Yet";
  const message =
    type === "note"
      ? "Your thoughts are waiting to be captured."
      : "No tasks added. Ready to get productive?";

  const Icon = type === "note" ? FileText : ClipboardList;

  return (
    <div className="my-6 flex flex-col items-center justify-center text-center p-8 bg-light-bg dark:bg-dark-bg rounded-xl border border-light-border dark:border-dark-border shadow-md">
      <Icon className="w-16 h-16 text-accent dark:text-dark-accent mb-4" />
      <h2 className="text-2xl font-semibold text-light-text dark:text-dark-text">
        {title}
      </h2>
      <p className="text-light-muted dark:text-dark-muted mt-2 mb-6">
        {message}
      </p>
      <Button
        onClick={
          onAdd ? onAdd : () => navigate(type === "note" ? "/notes" : "/tasks")
        }
        className="flex items-center gap-2"
      >
        <Plus size={16} />
        {type === "note" ? "Add Note" : "Add Task"}
      </Button>
    </div>
  );
};

export default NoData;
