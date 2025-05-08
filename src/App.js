import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import './styles/App.css';

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddMovie from "./pages/AddMovie";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import EditMovie from "./pages/EditMovie";
import MovieDetails from "./pages/MovieDetails";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(localStorage.getItem("userRoles"));

  const handleLogin = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userRoles", role);
    setToken(token); // Update state
    setUserRole(role); // Update state
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRoles");
    setToken(null); // Clear state
    setUserRole(null); // Clear state
  };

  useEffect(() => {
    // Sync state with localStorage on component mount
    setToken(localStorage.getItem("token"));
    setUserRole(localStorage.getItem("userRoles"));
  }, []);

  return (
    <BrowserRouter>
      <div className={!token ? "startup-page" : "app-container"}>
        <nav className="navbar">
          {!token ? (
            <div className="auth-links">
              <Link to="/login" className="nav-link">Login</Link>
              <span className="separator">|</span>
              <Link to="/register" className="nav-link">Register</Link>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/" className="nav-link">Home</Link>
              {userRole === "Admin" && (
                <>
                  <span className="separator">|</span>
                  <Link to="/add" className="nav-link">Add Movie</Link>
                  <span className="separator">|</span>
                  <Link to="/admin" className="nav-link">Admin Dashboard</Link>
                </>
              )}
              <span className="separator">|</span>
              <Link
                to="/logout"
                className="nav-link"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </div>
          )}
        </nav>

        <Routes>
          {!token ? (
            <>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              {userRole === "Admin" && (
                <Route
                  path="/add"
                  element={
                    <PrivateRoute>
                      <AddMovie />
                    </PrivateRoute>
                  }
                />
              )}
              {userRole === "Admin" && (
                <Route
                  path="/admin"
                  element={
                    <PrivateRoute>
                      <AdminDashboard />
                    </PrivateRoute>
                  }
                />
              )}
              {userRole === "Admin" && (
                <Route
                  path="/edit/:id"
                  element={
                    <PrivateRoute>
                      <EditMovie />
                    </PrivateRoute>
                  }
                />
              )}
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/logout" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;