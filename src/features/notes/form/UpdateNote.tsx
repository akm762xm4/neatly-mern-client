import { useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { AddNote, Note } from "../types"
import { useUpdateNoteMutation } from "../api/notesApi"

interface UpdateNoteProps {
  note: Note
  setIsOpen: (value: boolean) => void
}

export const UpdateNote: React.FC<UpdateNoteProps> = ({ note, setIsOpen }) => {
  const { register, handleSubmit, setValue } = useForm<AddNote>()
  const [updateTodo] = useUpdateNoteMutation()

  const onSubmit: SubmitHandler<AddNote> = (data) => {
    updateTodo({ _id: note._id, patch: data })
    setIsOpen(false)
  }

  useEffect(() => {
    setValue("title", note.title)
    setValue("text", note.text)
  }, [note, setValue])

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
          Update
        </button>
      </div>
    </form>
  )
}
