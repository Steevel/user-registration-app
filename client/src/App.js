import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
