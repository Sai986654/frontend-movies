import React from "react";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img src={movie.posterUrl} alt={movie.title} className="poster" />
      <h2>{movie.title}</h2>
      <p>{movie.genre}</p>
      <p>Release: {movie.releaseDate}</p>
      <p>Box Office: ₹{movie.boxOffice} Cr</p>
    </div>
  );
}

export default MovieCard;
