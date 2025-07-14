import { Routes, Route } from "react-router-dom";
import SidebarLayout from "./Components/Layout/SidebarLayout";
import NotesList from "./features/notes/NotesList";
import TaskList from "./features/task/TaskList";
import AuthPage from "./Components/AuthPage";
import OverviewPage from "./features/overview/OverviewPage";
import NotFound from "./Components/NotFound";
const App = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/"
        element={
          <SidebarLayout>
            <OverviewPage />
          </SidebarLayout>
        }
      />
      <Route
        path="/notes"
        element={
          <SidebarLayout>
            <NotesList />
          </SidebarLayout>
        }
      />
      <Route
        path="/tasks"
        element={
          <SidebarLayout>
            <TaskList />
          </SidebarLayout>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
