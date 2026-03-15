import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const [ToggleSign, setToggleSign] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {ToggleSign ? (
        <Register onSwitch={() => setToggleSign((prev) => !prev)} />
      ) : (
        <Login onSwitch={() => setToggleSign((prev) => !prev)} />
      )}
    </div>
  );
};

export default App;
