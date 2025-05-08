import React, { useEffect, useState } from "react";
import { getAllMovies } from "../services/moviesService";
import "../styles/Home.css";
import { Link } from "react-router-dom";

function Home() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const moviesPerPage = 4;

  useEffect(() => {
    getAllMovies().then((data) => {
      setMovies(data);
      setFilteredMovies(data);
      const uniqueGenres = ["All", ...new Set(data.map((m) => m.genre))];
      setGenres(uniqueGenres);
    });
  }, []);

  useEffect(() => {
    let result = movies;

    if (searchTerm) {
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenre !== "All") {
      result = result.filter((movie) => movie.genre === selectedGenre);
    }

    setFilteredMovies(result);
    setCurrentPage(1); // Reset to first page when filters/search change
  }, [searchTerm, selectedGenre, movies]);

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const paginatedMovies = filteredMovies.slice(startIndex, startIndex + moviesPerPage);

  return (
    <div className="container">
      <h1>🎬 Movies Portal</h1>

      {/* Search & Genre Filter */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search movies by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          style={{
            padding: "8px",
            width: "250px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      {/* Movie Cards */}
      {paginatedMovies.map((movie) => (
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

      <Link to={`/movie/${movies.id}`} key={movies.id} className="movie-card-link">
        <div className="movie-card">
          <img src={movies.posterUrl} alt={movies.title} />
          <div className="movie-details">
            <div className="movie-title">{movies.title}</div>
            <div className="movie-genre">Genre: {movies.genre}</div>
            <div className="movie-release">Release Date: {movies.releaseDate}</div>
            <div className="movie-boxoffice">Box Office: ₹{movies.boxOffice} Cr</div>
          </div>
        </div>
      </Link>

      {/* Pagination Controls */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "20px" }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{
            padding: "8px 16px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Previous
        </button>
        <span style={{ fontSize: "18px", fontWeight: "bold" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{
            padding: "8px 16px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
