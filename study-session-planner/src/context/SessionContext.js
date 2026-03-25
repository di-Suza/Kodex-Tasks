import { createContext, useEffect, useState } from "react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessions, setSessions] = useState(
    JSON.parse(localStorage.getItem("sessions")) || [],
  );

  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [sessions]);

  const addSession = (session) => {
    setSessions((prev) => [{ ...session, id: Date.now() }, ...prev]);
  };

  const deleteSession = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const toggleComplete = (id) =>
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isComplete: !s.isComplete } : s)),
    );

  return (
    <SessionContext.Provider
      value={{ sessions, addSession, deleteSession, toggleComplete }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
