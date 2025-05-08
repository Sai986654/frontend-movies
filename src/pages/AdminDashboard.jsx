import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllMovies } from "../services/moviesService";
import axios from "axios";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies().then(setMovies);
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`https://movies-db.azurewebsites.net/api/movies/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMovies((prev) => prev.filter((movie) => movie.id !== id));
  };

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <ul className="movies-list">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-item">
            <div className="movie-details">
              <strong>{movie.title}</strong>
            </div>
            <div className="movie-actions">
              <button
                className="edit-button"
                onClick={() => navigate(`/edit/${movie.id}`, { state: { movieId: movie.id } })}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(movie.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;