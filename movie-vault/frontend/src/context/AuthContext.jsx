import { createContext, useContext, useState, useEffect } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // We map currentUser to match our old structure if possible
      if (currentUser) {
        setUser({ 
          id: currentUser.uid, 
          username: currentUser.email.split('@')[0], 
          email: currentUser.email,
          createdAt: currentUser.metadata.creationTime
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (username, password) => {
    // If username doesn't have an @ assuming it's dummy domain for matching our previous logic
    const email = username.includes("@") ? username : `${username}@movievault.local`;
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (username, password) => {
    const email = username.includes("@") ? username : `${username}@movievault.local`;
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  if (loading) return null; // Or a nice spinner

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
