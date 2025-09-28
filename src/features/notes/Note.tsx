import { useEffect, useState } from "react";
import { Note as INote } from ".";
import {
  Copy,
  FileText,
  CheckSquare,
  FileEdit,
  MessageSquareQuoteIcon as MessageSquareQuestion,
  HelpCircle,
  X,
  PlusCircle,
  Calendar,
} from "lucide-react";
import { PiPushPinSimple } from "react-icons/pi";
import {
  useSummarizeNoteMutation,
  useSuggestTasksMutation,
  useRewriteNoteMutation,
  useQaNoteMutation,
  useQgNoteMutation,
} from "./notesApi";
import { showToast } from "../../Components/ui/Toast";
import { useAddTaskMutation } from "../task/taskApi";
import { AiButton } from "../../Components/ui/AIButton";

interface NoteProps {
  note: INote;
}

export const Note = ({ note }: NoteProps) => {
  const [aiResponse, setAiResponse] = useState("");
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [userInput, setUserInput] = useState("");
  const [rewriteStyle, setRewriteStyle] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [addingTaskId, setAddingTaskId] = useState<string | null>(null);

  // API mutations
  const [summarizeNote] = useSummarizeNoteMutation();
  const [suggestTasks] = useSuggestTasksMutation();
  const [rewriteNote, { isLoading: isRewriting }] = useRewriteNoteMutation();
  const [qaNote] = useQaNoteMutation();
  const [generateQuestions] = useQgNoteMutation();
  const [addTask, { isLoading: isAddingTask }] = useAddTaskMutation();

  // Handle summarize note
  const handleSummarize = async () => {
    setActiveFeature("summarize");
    setIsLoading(true);

    try {
      const response = await summarizeNote(note._id).unwrap();
      setAiResponse(response.summary);
    } catch (error) {
      console.error("Error summarizing note:", error);
      showToast.error("Failed to summarize note");
      setAiResponse("Failed to generate summary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle suggest tasks
  const handleSuggestTasks = async () => {
    setActiveFeature("tasks");
    setIsLoading(true);

    try {
      const response = await suggestTasks(note._id).unwrap();

      if (response.tasks) {
        try {
          const jsonString = response.tasks
            .replace(/.*\[/, "[")
            .replace(/\].*/, "]");
          const tasksArray = JSON.parse(jsonString);
          setAiResponse(JSON.stringify(tasksArray));
        } catch (e) {
          console.error("Failed to parse tasks", e);
          setAiResponse("Failed to parse tasks. Please try again.");
        }
      } else {
        setAiResponse("No tasks were suggested. Please try again.");
      }
    } catch (error) {
      console.error("Error suggesting tasks:", error);
      showToast.error("Failed to suggest tasks");
      setAiResponse("Failed to suggest tasks. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle rewrite note
  const handleRewrite = async () => {
    setActiveFeature("rewrite");

    if (!rewriteStyle) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await rewriteNote({
        noteId: note._id,
        style: rewriteStyle,
      }).unwrap();
      setAiResponse(response.rewritten);
    } catch (error) {
      console.error("Error rewriting note:", error);
      showToast.error("Failed to rewrite note");
      setAiResponse("Failed to rewrite note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Q&A
  const handleQA = async () => {
    setActiveFeature("qa");

    if (!userInput) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await qaNote({
        noteId: note._id,
        questions: userInput,
      }).unwrap();

      // Handle array of Q&A pairs
      const jsonString = response.answer
        .replace(/.*\[/, "[")
        .replace(/\].*/, "]");
      const qnaArray = JSON.parse(jsonString);
      setAiResponse(JSON.stringify(qnaArray));
    } catch (error) {
      console.error("Error with Q&A:", error);
      showToast.error("Failed to answer question");
      setAiResponse(
        `question: ${userInput}\n\nanswer: Failed to generate an answer. Please try again.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle generate questions
  const handleGenerateQuestions = async () => {
    setActiveFeature("questions");
    setIsLoading(true);

    try {
      const response = await generateQuestions(note._id).unwrap();

      // Handle string format questions
      if (typeof response.questions === "string") {
        setAiResponse(response.questions);
      }
      // Handle array format questions
      else if (Array.isArray(response.questions)) {
        setAiResponse(
          response.questions.map((q: string) => `• ${q}`).join("\n")
        );
      } else {
        setAiResponse("No questions generated.");
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      showToast.error("Failed to generate questions");
      setAiResponse("Failed to generate questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (task: {
    title: string;
    description?: string;
    priority?: string;
  }) => {
    try {
      setAddingTaskId(task.title);
      await addTask({
        title: task.title,
        description: task.description || "",
        priority: "medium",
      }).unwrap();
      showToast.success("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
      showToast.error("Failed to add task");
    } finally {
      setAddingTaskId(null);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(aiResponse);
    showToast.success("Copied to clipboard!");
  };

  const handleDismiss = () => {
    setAiResponse("");
    setActiveFeature(null);
    setUserInput("");
    setRewriteStyle(null);
  };

  if (!note) return <div>No note found.</div>;

  // Parse tasks if the response is in JSON format
  let tasks: { title: string; description: string }[] = [];
  if (activeFeature === "tasks" && aiResponse) {
    try {
      tasks = JSON.parse(aiResponse);
    } catch (e) {
      console.error("Failed to parse tasks", e);
    }
  }

  // Parse Q&A pairs if the response is in JSON format
  let qaPairs: { question: string; answer: string }[] = [];
  if (activeFeature === "qa" && aiResponse) {
    try {
      qaPairs = JSON.parse(aiResponse);
    } catch (e) {
      console.error("Failed to parse Q&A pairs", e);
    }
  }

  useEffect(() => {
    setAiResponse("");
  }, [activeFeature]);

  return (
    <div className="flex flex-col md:gap-4 gap-3">
      {/* Header Section */}
      <div className="flex md:flex-col flex-row md:items-start items-center justify-between gap-2">
        <div>
          <h2 className="md:text-2xl text-xl font-semibold">{note.title}</h2>
          <div className="flex flex-wrap md:gap-4 gap-3 text-muted-foreground mt-1">
            <span className="md:text-xl text-sm flex items-center gap-1">
              <FileText className="w-3 h-3" /> {note?.text?.split(" ").length}{" "}
              words
            </span>
            <span className="flex items-center gap-1 md:text-xl text-sm">
              <Calendar className="w-3 h-3" />{" "}
              {new Date(note.createdAt).toLocaleDateString()}
            </span>
            {note.isPinned && (
              <span className="flex items-center gap-1 text-yellow-400 md:text-xl text-sm">
                <PiPushPinSimple className="w-3 h-3" /> Pinned
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Note Content Section */}
      <div className="md:p-5 p-3 rounded-2xl bg-white/5 backdrop-blur-md inset-shadow-lg inset-shadow-black max-h-52 overflow-y-auto border border-white/10">
        <p className="whitespace-pre-line md:text-base text-sm leading-relaxed">
          {note.text}
        </p>
      </div>

      {/* AI Actions Section */}
      <div className="grid md:grid-cols-5 grid-cols-2 md:gap-3 gap-2">
        <AiButton
          onClick={handleSummarize}
          colors="from-purple-500/40 via-yellow-400/40 to-blue-500/40"
          activeFeature={activeFeature}
          disabled={isLoading || activeFeature === "summarize"}
        >
          <FileText className="w-4 h-4" />
          <span className="md:text-sm text-xs">Summarize</span>
        </AiButton>

        <AiButton
          onClick={handleSuggestTasks}
          colors="from-purple-500/40 via-pink-400/40 to-blue-500/40"
          activeFeature={activeFeature}
          disabled={isLoading || activeFeature === "tasks"}
        >
          <CheckSquare className="w-4 h-4" />
          <span className="md:text-sm text-xs">Tasks</span>
        </AiButton>

        <AiButton
          onClick={handleRewrite}
          activeFeature={activeFeature}
          disabled={isLoading || activeFeature === "rewrite"}
          colors="from-purple-500/40 via-green-400/40 to-blue-500/40"
        >
          <FileEdit className="w-4 h-4" />
          <span className="md:text-sm text-xs">Rewrite</span>
        </AiButton>

        <AiButton
          onClick={handleQA}
          colors="from-purple-500/40 via-orange-300/40 to-blue-500/40"
          activeFeature={activeFeature}
          disabled={isLoading || activeFeature === "qa"}
        >
          <MessageSquareQuestion className="w-4 h-4" />
          <span className="md:text-sm text-xs">Q&A</span>
        </AiButton>

        <AiButton
          onClick={handleGenerateQuestions}
          colors="from-purple-500/40 via-slate-800/40 to-blue-500/40"
          activeFeature={activeFeature}
          disabled={isLoading || activeFeature === "questions"}
        >
          <HelpCircle className="w-4 h-4" />
          <span className="md:text-sm text-xs">Questions</span>
        </AiButton>
      </div>

      {/* Dynamic AI Interaction Section */}
      {activeFeature && !aiResponse && (
        <div className="md:p-4 p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-inner">
          {activeFeature === "rewrite" && (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-muted-foreground">
                Select a style for rewriting:
              </p>
              <div className="flex flex-wrap gap-2">
                {["Casual", "Formal", "Concise"].map((style) => (
                  <button
                    key={style}
                    onClick={() => setRewriteStyle(style.toLowerCase())}
                    className={`py-1 px-3 md:text-sm text-xs rounded-full border disabled:cursor-not-allowed
                      
                      ${
                        rewriteStyle === style.toLowerCase()
                          ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/30"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    disabled={isRewriting}
                  >
                    {style}
                  </button>
                ))}
              </div>
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleRewrite}
                  disabled={isRewriting}
                  className={`py-1 px-4 rounded-full text-sm disabled:cursor-not-allowed 
                    ${
                      rewriteStyle
                        ? "bg-gradient-to-r from-purple-500/30 to-blue-500/30 hover:from-purple-500/40 hover:to-blue-500/40"
                        : "bg-white/10 cursor-not-allowed"
                    }`}
                >
                  {isRewriting ? "Generating..." : "Generate"}
                </button>
              </div>
            </div>
          )}

          {activeFeature === "qa" && (
            <div className="flex flex-col md:gap-3 gap-2 ">
              <p className="text-sm text-muted-foreground">
                Ask a question about this note:
              </p>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your question here..."
                className="text-sm w-full md:p-3 p-2 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/30 focus:outline-none resize-none"
                rows={3}
              />
              <div className="flex justify-end">
                <button
                  onClick={handleQA}
                  disabled={!userInput.trim() || isLoading}
                  className={`py-1 px-4 rounded-full text-sm  disabled:cursor-not-allowed
                    ${
                      userInput.trim()
                        ? "bg-gradient-to-r from-purple-500/30 to-blue-500/30 hover:from-purple-500/40 hover:to-blue-500/40"
                        : "bg-white/10 cursor-not-allowed"
                    }`}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          )}

          {(activeFeature === "summarize" ||
            activeFeature === "questions" ||
            activeFeature === "tasks") && (
            <div className="flex justify-center items-center py-6">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
                  <span className="text-sm text-muted-foreground">
                    Processing...
                  </span>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">
                  Generating {activeFeature}...
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* AI Response Section */}
      {aiResponse && (
        <div className="relative p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 shadow-lg max-h-60 overflow-y-auto">
          <div className="absolute top-2 right-2 flex gap-1">
            <button
              title="Copy"
              onClick={handleCopy}
              className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-purple-300" />
            </button>
            <button
              title="Dismiss"
              onClick={handleDismiss}
              className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-purple-300" />
            </button>
          </div>

          {activeFeature === "tasks" ? (
            <div className="pt-4">
              <ul className="space-y-2 mt-2">
                {tasks.map((task) => (
                  <li
                    key={task.title}
                    className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white/5"
                  >
                    <span className="text-sm">{task.title}</span>
                    <button
                      onClick={() => handleAddTask(task)}
                      className="flex items-center gap-1 py-1 px-2 rounded-full text-xs bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 disabled:cursor-not-allowed"
                      disabled={isAddingTask}
                    >
                      <PlusCircle className="w-3 h-3" />
                      <span className="text-xs">
                        {addingTaskId === task.title ? "Adding..." : "Add"}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : activeFeature === "qa" ? (
            <div className="pt-5 md:space-y-4 space-y-3">
              {qaPairs.map((qaItem, index) => {
                return (
                  <div
                    key={index}
                    className="md:p-3 p-2 rounded-lg bg-white/5 border border-purple-500/20"
                  >
                    <p className="font-medium mb-2 md:text-base text-sm">
                      {index + 1}.{qaItem.question} ?
                    </p>

                    <p className=" md:text-sm text-xs text-gray-500 dark:text-gray-400">
                      {qaItem.answer}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="mt-2 text-sm leading-relaxed whitespace-pre-line pt-4">
              {aiResponse}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
