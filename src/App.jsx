import {
  BrowserRouter as GongRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/Form";
import Hierarchy from "./components/Hierarchy";
import { AuthSessionProvider } from "./context/AuthSession";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <AuthSessionProvider>
      <GongRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/hierarchy"
            element={
              <ProtectedRoute>
                <Hierarchy />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </GongRouter>
    </AuthSessionProvider>
  );
}
