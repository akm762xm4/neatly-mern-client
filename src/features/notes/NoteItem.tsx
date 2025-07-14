import { useState } from "react";
import { Note } from ".";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { Modal } from "../../Components/Modal";
import {
  useDeleteNoteMutation,
  useTogglePinMutation,
  // useUpdateNoteMutation,
} from "./notesApi";
import { formatDate } from "../../utils/formatDate";
import { PiPushPinSimple, PiPushPinSimpleSlash } from "react-icons/pi";
import { NoteForm } from "./NoteForm";
import { showToast } from "../../Components/ui/Toast";

interface NoteItemProps {
  note: Note;
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const [deleteNote, { isLoading }] = useDeleteNoteMutation();
  // const [updateNote] = useUpdateNoteMutation();
  const [togglePin] = useTogglePinMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleDelete = async () => {
    await deleteNote(note._id);
    setIsAlertOpen(false);
    showToast.success("Note deleted successfully!");
  };

  return (
    <>
      <div
        className={`card relative group hover:shadow-md transition ${
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
              className="cursor-pointer text-yellow-400 hover:scale-110 transition"
              size={18}
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

        {/* Title */}
        <h2 className="text-xl font-semibold mb-2">{note.title}</h2>

        {/* Content */}
        <pre className="text-sm whitespace-pre-wrap break-words text-light-text dark:text-dark-text max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          {note.text}
        </pre>

        {/* Date */}
        <p className="text-xs text-muted mt-4 font-medium">
          Created: {formatDate(note.createdAt)}
        </p>
      </div>

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
            <div className="px-6">
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
