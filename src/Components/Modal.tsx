import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import * as ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/Button";

interface ModalProps {
  title: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  child: React.ReactNode;
  deleteHandler?: () => void;
  deleteButtonText?: string;
  isDeleting?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  setIsOpen,
  child,
  deleteHandler,
  deleteButtonText = "Delete",
  isDeleting = false,
}) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const portalDiv = document.querySelector(".portalModalDiv") as HTMLDivElement;
  if (!portalDiv) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/30 dark:bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <motion.div
            key="modal"
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { type: "spring", stiffness: 300, damping: 25 },
            }}
            exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.2 } }}
          >
            <div className="relative flex flex-col w-full max-w-lg p-4 rounded-xl bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text shadow-card">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text transition"
                title="Close Modal"
              >
                <AiOutlineClose size={24} />
              </button>

              {/* Title */}
              <h2 className="text-title py-4  px-6">{title}</h2>

              {/* Content */}
              <div>{child}</div>

              {/* Delete Action */}
              {deleteHandler && (
                <div className="mt-6 flex justify-end">
                  <Button
                    disabled={isDeleting}
                    variant="danger"
                    onClick={deleteHandler}
                  >
                    {isDeleting && isDeleting === true
                      ? " Deleting..."
                      : deleteButtonText}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    portalDiv
  );
};
