import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("inkwell_users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [user, setUser] = useState(() => {
    const loggedInUser = localStorage.getItem("inkwell_logged_in");
    return loggedInUser ? JSON.parse(loggedInUser) : null;
  });

  useEffect(() => {
    localStorage.setItem("inkwell_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("inkwell_logged_in", JSON.stringify(user));
    } else {
      localStorage.removeItem("inkwell_logged_in");
    }
  }, [user]);

  const signup = (name, email, password, role) => {
    const exists = users.find((u) => u.email === email);
    if (exists) return { success: false, message: "User already exists!" };

    const newUser = { name, email, password, role };
    setUsers([...users, newUser]);
    setUser(newUser);
    return { success: true, message: "User Registered Successfully!" };
  };

  const login = (email, password) => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (foundUser) {
      setUser(foundUser);
      return { success: true, message: "Logged In Successfully!" };
    }
    return { success: false, message: "Invalid credentials!" };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, users, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
