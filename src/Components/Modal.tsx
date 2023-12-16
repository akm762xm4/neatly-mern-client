import { useEffect } from "react"
import { AiOutlineClose } from "react-icons/ai"
import * as ReactDOM from "react-dom"
interface AddModalProps {
  title: string
  isOpen?: boolean
  setIsOpen: (value: boolean) => void
  child: React.ReactNode
  deleteHandler?: () => void
}
export const Modal: React.FC<AddModalProps> = ({
  title,
  // isOpen,
  setIsOpen,
  child,
  deleteHandler,
}) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden"
    return () => {
      document.body.style.overflowY = "scroll"
    }
  })
  return ReactDOM.createPortal(
    <>
      <div
        onClick={() => setIsOpen(false)}
        className="fixed top-0 right-0 left-0 bottom-0 bg-gray-300/70"
      ></div>
      <div className="shadow-lg shadow-gray-500 fixed flex flex-col justify-center items-center min-w-[20rem] md:min-w-[30rem] max-w-[20rem] md:max-w-[30rem] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#6B9080] p-10 rounded backdrop-blur gap-2">
        <button
          title="Close"
          className="absolute right-2.5 top-2.5 p-2 text-[1rem] border-none rounded-[0.3rem] bg-[#F6FFF8]"
          onClick={() => setIsOpen(false)}
        >
          <AiOutlineClose size={18} />
        </button>
        <div className="text-3xl font-semibold">{title}</div>
        {child}
        {deleteHandler && (
          <button
            className="rounded px-2 select-none bg-[#EAF4F4]"
            onClick={deleteHandler}
          >
            Delete
          </button>
        )}
      </div>
    </>,
    document.querySelector(".portalModalDiv") as HTMLDivElement
  )
}
