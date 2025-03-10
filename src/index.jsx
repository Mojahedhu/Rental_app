import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePag from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <header>
        <Link to={"/"} className="site-logo">
          #VanLife
        </Link>
        <nav>
          <Link to={"/"}>HomePae</Link>
          <Link to={"/about"}>About</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<HomePag />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
createRoot(document.getElementById("root")).render(<App />);
