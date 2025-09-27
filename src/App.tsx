import { Routes, Route } from "react-router-dom";
import SidebarLayout from "./Components/Layout/SidebarLayout";
import NotesList from "./features/notes/NotesList";
import TaskList from "./features/task/TaskList";
import AuthPage from "./Components/AuthPage";
import DashboardPage from "./features/dashboard/DashboardPage";
import NotFound from "./Components/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute";
const App = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />

      <Route
        path="/"
        element={
          <SidebarLayout>
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          </SidebarLayout>
        }
      />
      <Route
        path="/notes"
        element={
          <SidebarLayout>
            <ProtectedRoute>
              <NotesList />
            </ProtectedRoute>
          </SidebarLayout>
        }
      />
      <Route
        path="/tasks"
        element={
          <SidebarLayout>
            <ProtectedRoute>
              <TaskList />
            </ProtectedRoute>
          </SidebarLayout>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
