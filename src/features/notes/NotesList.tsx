import { useState, useMemo } from "react";
import { useGetNotesQuery } from "./notesApi";
import NoteItem from "./NoteItem";
import { Modal } from "../../Components/Modal";
import { Plus, Search, X } from "lucide-react";
import { Input } from "../../Components/ui/Input";
import SkeletonNoteCard from "./SkeletonNoteCard";
import QuoteBanner from "../../Components/QuoteBanner";
import PageHeader from "../../Components/PageHeader";
import NoData from "../../Components/NoData";
import { NoteForm } from "./NoteForm";
import { Note } from ".";

const NotesList = () => {
  const { data: notes, isLoading, isFetching } = useGetNotesQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const filteredNotes = useMemo(() => {
    if (!searchTerm.trim()) return notes;

    const lower = searchTerm.toLowerCase();
    return notes?.filter(
      (note: Note) =>
        note.title.toLowerCase().includes(lower) ||
        (note.text && note.text.toLowerCase().includes(lower))
    );
  }, [searchTerm, notes]);

  const sortedNotes = useMemo(() => {
    if (!filteredNotes) return [];

    return [...filteredNotes].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [filteredNotes, sortOrder]);

  return (
    <>
      {/* 🔰 Page Title + Subtitle */}
      <PageHeader
        title="My Notes"
        subtitle="All your thoughts, ideas, and plans in one place."
      />

      {/* 🧠 Motivational Quote */}
      <QuoteBanner />

      {/* 🔍 Search & Sort Bar */}
      <div className="flex flex-row items-center justify-between md:gap-3 gap-2 md:mb-6 mb-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 z-10" />
            <Input
              label=""
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search notes..."
              className="pl-10"
            />
            <X
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 cursor-pointer"
              onClick={() => setSearchTerm("")}
              style={{ display: searchTerm ? "block" : "none" }}
            />
          </div>
        </div>

        <select
          title="Sort Notes"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
          className="text-sm rounded-md border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-card text-gray-700 dark:text-gray-200 px-3 py-2 focus:ring-2 focus:ring-accent dark:focus:ring-dark-accent transition"
        >
          <option value="newest">Latest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* ⏳ Skeleton Loader */}
      {(isLoading || isFetching) && (
        <div className="grid  md:grid-cols-3 grid-cols-1 md:gap-4 gap-3 md:pb-8 pb-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonNoteCard key={i} />
          ))}
        </div>
      )}

      {notes?.length === 0 && (
        <NoData type="note" onAdd={() => setIsOpen(true)} />
      )}

      {/* 🗂 Notes Grid */}
      <div className="grid md:grid-cols-3 grid-cols-1 md:gap-4 gap-3 md:pb-8 pb-6">
        {sortedNotes?.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}

        {/* ➕ Add Note Card */}
        {(!isLoading || !isFetching) && (
          <div
            onClick={() => setIsOpen(true)}
            className="card cursor-pointer border-2 border-dashed border-accent text-accent dark:border-dark-accent dark:text-dark-accent hover:scale-105 flex flex-col justify-center items-center p-6 transition "
          >
            <Plus className="w-8 h-8 mb-2" />
            <p className="text-sm font-semibold">Add Note</p>
          </div>
        )}
      </div>

      {/* ➕ Add Note Modal */}
      {isOpen && (
        <Modal
          title="Add Note"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          child={<NoteForm setIsOpen={setIsOpen} />}
        />
      )}
    </>
  );
};

export default NotesList;
