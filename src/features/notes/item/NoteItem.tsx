import { useState } from "react"
import { Note } from "../types"
import { FiEdit } from "react-icons/fi"
import { AiFillDelete } from "react-icons/ai"
import { Modal } from "../../../Components/Modal"
import { UpdateNote } from "../form/UpdateNote"
import { useDeleteNoteMutation } from "../api/notesApi"
import { formatDate } from "../../../utils/formatDate"

interface NoteItemProps {
  note: Note
}
const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const [deleteNote] = useDeleteNoteMutation()
  const [isOpen, setIsOpen] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const handleDelete = () => {
    deleteNote(note._id)
    setIsAlertOpen(false)
  }

  return (
    <>
      <div className="relative flex flex-col border border-gray-600 px-4 py-2 rounded bg-[#EAF4F4]">
        <div className="flex absolute right-0 top-0 p-2 gap-2">
          <FiEdit
            title="Edit"
            onClick={() => setIsOpen(true)}
            className="cursor-pointer text-sky-400"
            size={20}
          />
          <AiFillDelete
            onClick={() => setIsAlertOpen(true)}
            title="Delete"
            className="cursor-pointer text-red-400"
            size={20}
          />
        </div>
        <div className="text-2xl font-bold">{note?.title}</div>
        <div className="overflow-hidden">
          <pre>{note?.text}</pre>
        </div>
        <div className="flex items-center mt-6 text-xs font-semibold text-gray-600">
          Created: {formatDate(note?.createdAt)}
        </div>
      </div>
      {isOpen && (
        <Modal
          title="Update Note"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          child={<UpdateNote setIsOpen={setIsOpen} note={note} />}
        />
      )}
      {isAlertOpen && (
        <Modal
          title="Delete Note!"
          isOpen={isAlertOpen}
          setIsOpen={setIsAlertOpen}
          child={<div>Are you Sure want to delete "{note.title}" ?</div>}
          deleteHandler={handleDelete}
        />
      )}
    </>
  )
}
export default NoteItem
