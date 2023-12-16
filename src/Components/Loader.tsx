import loading from "../assets/loading.gif"
export const Loader = () => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-300/70"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 tracking-tighter text-[#081c15] flex justify-center items-center ">
        {/* <CgSearchLoading fontSize={100} /> */}
        <img src={loading} alt="Error" />
      </div>
    </>
  )
}
