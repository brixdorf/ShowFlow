import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SeriesDetail from "./pages/SeriesDetail";
import Favorites from "./pages/Favorites";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/series/:id" element={<SeriesDetail />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;