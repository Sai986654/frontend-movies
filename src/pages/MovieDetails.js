import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`https://localhost:7150/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.error("Error fetching movie:", err));
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-details-page">
      <h2>{movie.title}</h2>
      <img src={movie.posterUrl} alt={movie.title} style={{ width: "300px", height: "auto" }} />
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Release Date:</strong> {movie.releaseDate}</p>
      <p><strong>Box Office:</strong> ₹{movie.boxOffice} Cr</p>

      {movie.youTubeTrailerId && (
        <div style={{ marginTop: "1rem" }}>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${movie.youTubeTrailerId}`}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
