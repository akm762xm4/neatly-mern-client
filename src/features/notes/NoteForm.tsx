import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAddNoteMutation, useUpdateNoteMutation } from "./notesApi";
import { Input } from "../../Components/ui/Input";
import { Button } from "../../Components/ui/Button";
import { showToast } from "../../Components/ui/Toast";

interface NoteFormProps {
  setIsOpen: (value: boolean) => void;
  noteId?: string;
  initialData?: {
    title: string;
    text?: string;
  };
}

interface NoteData {
  title: string;
  text?: string;
}

export const NoteForm: React.FC<NoteFormProps> = ({
  setIsOpen,
  initialData,
  noteId,
}) => {
  const [addNote] = useAddNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<NoteData>();

  const isEdit = Boolean(initialData && noteId);

  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title);
      setValue("text", initialData.text || "");
    }
  }, [initialData, setValue]);

  const onSubmit: SubmitHandler<NoteData> = async (data) => {
    try {
      if (isEdit) {
        await updateNote({ _id: noteId!, ...data }).unwrap();
      } else {
        await addNote(data).unwrap();
      }
      showToast.success(`Note ${isEdit ? "updated" : "added"} successfully`);
      setIsOpen(false);
    } catch (err: any) {
      showToast.error(err?.data?.message || "Failed to save note");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="space-y-5 p-4 w-full">
        {/* Title Field */}
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
            {...register("title", { required: true })}
          />
        </div>

        {/* Text Field */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="text"
            className="text-sm font-medium text-light-text dark:text-dark-text"
          >
            Text
          </label>
          <textarea
            id="text"
            rows={5}
            placeholder="Write your note..."
            className="rounded-md border border-light-border dark:border-dark-border dark:bg-dark-bg text-sm text-light-text dark:text-dark-text px-3 py-2 resize-none outline-none focus:ring-2 focus:ring-accent dark:focus:ring-dark-accent focus:placeholder-transparent"
            {...register("text")}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isEdit ? "Update" : "Add"}
          </Button>
        </div>
      </div>
    </form>
  );
};
