import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ChatLayout from "./pages/ChatLayout";
import PrivateRoute from "./pages/PrivateRoute";
import PublicRoute from "./pages/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<HomePage />} />

        {/* Login & Signup */}
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        {/* Chat Layout (Protected) */}
        <Route path="/chatlayout" element={<ChatLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
