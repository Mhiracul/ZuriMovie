// MovieList.js
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import PropTypes from "prop-types";
//import { FaArrowRight } from "react-icons/fa"; // Import the arrow icon

const MovieList = ({ setNotification }) => {
  const [movies, setMovies] = useState([]);
  const apiKey = "83672d307b162a7a1a150ffb13438aba";

  useEffect(() => {
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;

    axios
      .get(apiUrl)
      .then(async (response) => {
        const top10Movies = response.data.results.slice(0, 11);

        const moviesWithDetails = await Promise.all(
          top10Movies.map(async (movie) => {
            try {
              const movieDetailsResponse = await axios.get(
                `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`
              );

              return { ...movie, ...movieDetailsResponse.data };
            } catch (error) {
              console.error("Error fetching movie details:", error);
              return movie;
            }
          })
        );

        setMovies(moviesWithDetails);
      })
      .catch((error) => {
        console.error("Error fetching top 10 movies:", error);
      });
  }, []);

  const handleFavoriteClick = (movie) => {
    const notificationContent = (
      <div className="absolute top-2 right-2 z-[99999] bg-white p-2 shadow-md rounded">
        <div className="flex items-center">
          {" "}
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            className="w-14 h-14 object-cover object-center mr-2"
          />
          <p className="text-gray-900 text-sm font-semibold">{movie.title}</p>
        </div>
        <p className="text-gray-600 text-xs">Added to favorites</p>
      </div>
    );

    setNotification(notificationContent);

    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-4">
        <div className="mb-4 w-full flex justify-between items-center">
          <h2 className="text-3xl font-semibold mb-2">Featured Movies</h2>
          <p className="text-[#BE123C] ">See More {">"}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-12 gap-4 max-w-screen-3xl mx-auto">
        {movies.slice(1).map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onFavoriteClick={handleFavoriteClick}
          />
        ))}
      </div>
    </div>
  );
};

MovieList.propTypes = {
  setNotification: PropTypes.func.isRequired,
};

export default MovieList;
