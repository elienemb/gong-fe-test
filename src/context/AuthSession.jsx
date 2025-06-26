import { createContext, useContext, useState } from "react";

export const AuthSession = createContext(null);// This creates a context for authentication session management.

export function AuthSessionProvider({ children }) {
  const [user, setUser] = useState(null);
  const logout = () => setUser(null);
  return (
    <AuthSession.Provider value={{ user, setUser, logout }}>
      {children} 
    </AuthSession.Provider>
  );
}

export function useAuth() {
  return useContext(AuthSession);
}
// This hook allows components to access the authentication context.
// It provides a way to get the current user and the function to update the user state. 
// Components can use this hook to check if a user is logged in or to log out by setting the user to null.
