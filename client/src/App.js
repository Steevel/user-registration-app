import "./App.css";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
