import React, { useEffect, useState } from "react";
import { getAllMovies } from "../services/moviesService";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies().then(setMovies);
  }, []);

  return (
    <div className="container">
        <h1>🎬 Movies Portal</h1>
        {movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
            <img src={movie.posterUrl} alt={movie.title} />

            <div className="movie-details">
                <div className="movie-title">{movie.title}</div>
                <div className="movie-genre">Genre: {movie.genre}</div>
                <div className="movie-release">Release Date: {movie.releaseDate}</div>
                <div className="movie-boxoffice">Box Office: ₹{movie.boxOffice} Cr</div>

                {movie.youTubeTrailerId && (
                <div style={{ marginTop: "1rem" }}>
                    <iframe
                    width="300"
                    height="170"
                    src={`https://www.youtube.com/embed/${movie.youTubeTrailerId}`}
                    title="Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    ></iframe>
                </div>
                )}
            </div>
            </div>
        ))}
    </div>

  );
  
}

export default Home;
