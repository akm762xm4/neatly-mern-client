import { useForm, SubmitHandler } from "react-hook-form";
import { useAddNoteMutation } from "./notesApi";
interface AddNote {
  title: string;
  text?: string;
}

interface AddNoteProps {
  setIsOpen: (value: boolean) => void;
}
export const AddNote: React.FC<AddNoteProps> = ({ setIsOpen }) => {
  const [addNote] = useAddNoteMutation();
  const { register, handleSubmit } = useForm<AddNote>();
  const onSubmit: SubmitHandler<AddNote> = (data) => {
    addNote(data);
    setIsOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="py-4 px-[65px] flex flex-col gap-4">
        <div>
          <label htmlFor="title" className="font-medium text-xl">
            Title:
          </label>
          <br />
          <input
            id="title"
            className="w-48 md:w-80 px-1 outline-none rounded"
            {...register("title")}
          />
        </div>
        <div>
          <label htmlFor="text" className="font-medium text-xl">
            Text:
          </label>
          <br />
          <textarea
            id="text"
            className="w-48 md:w-80 h-32 outline-none rounded px-1 resize-none"
            {...register("text")}
          />
        </div>
        <button
          title="Submit"
          className="flex w-20 items-center justify-center rounded px-2 select-none bg-[#EAF4F4]"
          onClick={() => handleSubmit(onSubmit)}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
