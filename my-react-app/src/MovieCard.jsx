import PropTypes from "prop-types";
import IMDb from "./assets/IMDb.png";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const countryAbbreviations = {
  "United States of America": "USA",
};

const MovieCard = ({ movie, onFavoriteClick }) => {
  const country =
    movie.production_countries && movie.production_countries.length > 0
      ? movie.production_countries[0].name
      : "";
  const countryAbbreviation = countryAbbreviations[country] || country;

  const rating = `${movie.vote_average} / 100`;

  return (
    <div
      className="  rounded-none overflow-hidden   relative"
      data-testid="movie-card"
    >
      <FaHeart
        className="absolute top-2 right-2  hover:text-red-500 text-[#F3F4F6] p-1 cursor-pointer bg-gray-400 rounded-full"
        onClick={() => {
          onFavoriteClick(movie);
        }}
      />
      <Link to={`/movies/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-96 rounded-md object-cover object-center"
          data-testid="movie-poster"
        />

        <div className="p-4 flex flex-col gap-2">
          <p
            className="text-[#9CA3AF] text-xs font-semibold"
            data-testid="movie-release-date"
          >
            {countryAbbreviation}, {movie.release_date}
          </p>
          <h2
            className="md:text-[18px] text-sm font-bold"
            data-testid="movie-title"
          >
            {movie.title}
          </h2>
          <div className="flex items-center">
            <img src={IMDb} alt="IMDb Logo" className="w-9 h-4 mr-2" />
            <p className="text-gray-900 text-xs font-normal">{rating}</p>
          </div>{" "}
        </div>
      </Link>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    production_countries: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ),
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ),
    vote_average: PropTypes.number.isRequired,
    vote_count: PropTypes.number.isRequired,
  }).isRequired,
  onFavoriteClick: PropTypes.func.isRequired,
};
export default MovieCard;
