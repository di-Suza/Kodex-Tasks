import { createContext, useState, useEffect } from "react";
import { useToast } from "../hooks/useToast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const { showToast } = useToast();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");

    if (users.find((u) => u.email === userData.email)) {
      return { success: false, message: "User already exists!" };
    }

    users.push(userData);
    localStorage.setItem("registeredUsers", JSON.stringify(users));

    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    setUser(userData);

    showToast("✅ Account Created!");

    return { success: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const foundUser = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (foundUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      setUser(foundUser);
      showToast(`Welcome back, ${foundUser.name.split(" ")[0]}! 👋`);
      return { success: true };
    }

    return { success: false, message: "Invalid credentials!" };
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    showToast("Logged out. See you soon! 👋");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
