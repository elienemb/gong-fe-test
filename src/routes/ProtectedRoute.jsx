// This component checks if the user is authenticated. If not, it redirects to the login page.
// It uses the `useAuth` hook to access the authentication context and checks if a user is present.
// If the user is authenticated, it renders the children components;
//  otherwise, it redirects to the login page using `Navigate` from `react-router-dom`.
// This is useful for protecting routes that require authentication in a React application.
// The `replace` prop in `Navigate` ensures that the login page does not remain in the history stack,
// preventing the user from navigating back to a protected route after logging out.

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthSession";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}
