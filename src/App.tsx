import { Navbar } from "./Components/Navbar"
import { Unauthorized } from "./Components/Unauthorized"
import NotesList from "./features/notes/list/NotesList"
// import { useEffect } from "react"

const App = () => {
  const token = localStorage.getItem("token")
  return (
    <main className="h-screen bg-[#CCE3DE]">
      <Navbar />
      {!token ? <Unauthorized /> : <NotesList />}
    </main>
  )
}
export default App
