import { useState } from "react"
import { useGetNotesQuery } from "../api/notesApi"
import NoteItem from "../item/NoteItem"
import { GrAdd } from "react-icons/gr"
import { Modal } from "../../../Components/Modal"
import { AddNote } from "../form/AddNote"
import { Loader } from "../../../Components/Loader"

const NotesList = () => {
  const { data: notes, isLoading, isFetching } = useGetNotesQuery()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2 z-20 pt-16">
        {notes?.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
        <div
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center border border-black p-4 rounded bg-[#EAF4F4]  cursor-pointer"
        >
          <GrAdd title="Add Note" className="text-2xl select-none" />
        </div>
      </div>
      {isOpen && (
        <Modal
          title="Add Note"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          child={<AddNote setIsOpen={setIsOpen} />}
        />
      )}
      {(isLoading || isFetching) && <Loader />}
    </>
  )
}
export default NotesList
