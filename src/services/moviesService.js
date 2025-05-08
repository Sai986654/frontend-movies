import axios from "axios";

const API_BASE_URL = "https://movies-db.azurewebsites.net/api/movies"; // Local backend URL

export const getAllMovies = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const createMovie = async (movie) => {
  const response = await axios.post(API_BASE_URL, movie);
  return response.data;
};
