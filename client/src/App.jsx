import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/loginForm/Login";
import Signup from "./Pages/signUpForm/Signup";
import ProtectRoute from "./Pages/ProtectRoute";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/protectedroute" element={<ProtectRoute />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
