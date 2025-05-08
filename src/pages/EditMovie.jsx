import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const EditMovie = () => {
    const { id } = useParams();
    const location = useLocation();
    const { movieId } = location.state || {};
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: "",
    genre: "",
    releaseDate: ""  // This will be a full date (YYYY-MM-DD)
  });

  useEffect(() => {
    const fetchMovie = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`https://localhost:7150/api/movies`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const foundMovie = res.data.find((m) => m.id.toString() === id);
      if (foundMovie) {
        // Convert releaseDate to YYYY-MM-DD format for input
        const formattedDate = new Date(foundMovie.releaseDate).toISOString().split("T")[0];
        setMovie({ ...foundMovie, releaseDate: formattedDate });
      }
    };
    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.put(`https://localhost:7150/api/movies/${movieId}`, movie, {
      headers: { Authorization: `Bearer ${token}` }
    });
    navigate("/admin");
  };

  return (
    <div className="edit-movie-form">
      <h2>Edit Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input name="title" value={movie.title} onChange={handleChange} required />

        <label>Genre:</label>
        <input name="genre" value={movie.genre} onChange={handleChange} required />

        <label>Release Date:</label>
        <input
          name="releaseDate"
          type="date"
          value={movie.releaseDate}
          onChange={handleChange}
          required
        />

        <button type="submit">Update Movie</button>
      </form>
    </div>
  );
};

export default EditMovie;
