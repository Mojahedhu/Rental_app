import { auth } from "../api";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import PropTypes from "prop-types";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Load user from localStorage initially (if exists)
    return JSON.parse(localStorage.getItem("user")) || null;
  });
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // save to localStorage
      // Only update localStorage if user exists
      if (currentUser) {
        localStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        localStorage.removeItem("user");
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const obj = useMemo(() => ({ user, loading }), [loading, user]); // Vlue is cashed by useMemo
  return <AuthContext.Provider value={obj}>{children}</AuthContext.Provider>;
}
AuthProvider.propTypes = {
  children: PropTypes,
};

// Custom hook to use AuthContect

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
