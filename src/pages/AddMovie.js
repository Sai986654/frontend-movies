import React, { useState } from "react";
import { createMovie } from "../services/moviesService";

function AddMovie() {
  const [movie, setMovie] = useState({
    title: "",
    genre: "",
    releaseDate: "",
    boxOffice: 0,
    posterUrl: "",
    youTubeTrailerId: "",
  });

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMovie(movie);
    alert("Movie added successfully!");
  };

  return (
    <div className="form-container">
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} />
        <input name="genre" placeholder="Genre" onChange={handleChange} />
        <input name="releaseDate" type="date" onChange={handleChange} />
        <input name="boxOffice" type="number" placeholder="Box Office" onChange={handleChange} />
        <input name="posterUrl" placeholder="Poster URL" onChange={handleChange} />
        <input name="youTubeTrailerId" placeholder="YouTube TrailerId" onChange={handleChange} />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}

export default AddMovie;
