import { useState } from "react";
import { Note as INote } from ".";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { Modal } from "../../Components/Modal";
import {
  useDeleteNoteMutation,
  useTogglePinMutation,
  // useGetNoteSummaryQuery,
} from "./notesApi";
import { formatDate } from "../../utils/formatDate";
import { PiPushPinSimple, PiPushPinSimpleSlash } from "react-icons/pi";
import { NoteForm } from "./NoteForm";
import { showToast } from "../../Components/ui/Toast";
import { Note } from "./Note";

interface NoteItemProps {
  note: INote;
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const [deleteNote, { isLoading }] = useDeleteNoteMutation();
  const [togglePin] = useTogglePinMutation();

  const [isOpen, setIsOpen] = useState(false); // edit modal
  const [isAlertOpen, setIsAlertOpen] = useState(false); // delete modal
  const [isReadModalOpen, setIsReadModalOpen] = useState(false); // read full note

  const handleDelete = async () => {
    await deleteNote(note._id);
    setIsAlertOpen(false);
    showToast.success("Note deleted successfully!");
  };
  return (
    <>
      <div
        className={`card relative group hover:shadow-md transition-all duration-300 hover:scale-[105%] hover:-rotate-[1deg]  ${
          note.isPinned
            ? "border-2 border-yellow-400 dark:border-yellow-300"
            : ""
        }`}
      >
        {/* Actions */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-80 group-hover:opacity-100 transition z-10">
          {note.isPinned ? (
            <PiPushPinSimple
              title="Unpin Note"
              onClick={() => togglePin(note._id)}
              className="cursor-pointer text-yellow-400 hover:scale-110 transition md:w-6 md:h-6 w-5 h-5"
              // size={18}
            />
          ) : (
            <PiPushPinSimpleSlash
              title="Pin Note"
              onClick={() => togglePin(note._id)}
              className="cursor-pointer text-gray-400 hover:scale-110 transition"
              size={18}
            />
          )}
          <FiEdit
            title="Edit"
            onClick={() => setIsOpen(true)}
            className="cursor-pointer text-blue-600 dark:text-sky-400 hover:scale-110 transition"
            size={18}
          />
          <AiFillDelete
            onClick={() => setIsAlertOpen(true)}
            title="Delete"
            className="cursor-pointer text-red-500 hover:scale-110 transition"
            size={18}
          />
        </div>

        {/* Title + snippet */}
        <div
          className="cursor-pointer p-2"
          onClick={() => setIsReadModalOpen(true)}
        >
          <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
          <pre className="text-sm whitespace-pre-wrap break-words text-light-text dark:text-dark-text line-clamp-3">
            {note.text}
          </pre>
        </div>

        {/* Date */}
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
          Created: {formatDate(note.createdAt)}
        </p>
      </div>

      {/* Read Full Note + AI Summary */}
      {isReadModalOpen && (
        <Modal
          title=""
          isOpen={isReadModalOpen}
          setIsOpen={setIsReadModalOpen}
          child={<Note note={note} />}
        />
      )}

      {/* Update Modal */}
      {isOpen && (
        <Modal
          title="Update Note"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          child={
            <NoteForm
              setIsOpen={setIsOpen}
              noteId={note._id}
              initialData={{ title: note.title, text: note.text }}
            />
          }
        />
      )}

      {/* Delete Confirmation */}
      {isAlertOpen && (
        <Modal
          title="Delete Note!"
          isOpen={isAlertOpen}
          setIsOpen={setIsAlertOpen}
          child={
            <div className="md:px-6 px-3 md:text-base text-sm">
              Are you sure you want to delete note “{note.title}”?
            </div>
          }
          deleteHandler={handleDelete}
          isDeleting={isLoading}
        />
      )}
    </>
  );
};

export default NoteItem;
