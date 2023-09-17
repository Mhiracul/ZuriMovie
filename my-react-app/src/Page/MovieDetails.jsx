import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ImTicket } from "react-icons/im";
import { AiOutlineBars } from "react-icons/ai";
function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const apiKey = "83672d307b162a7a1a150ffb13438aba";
  const [directors, setDirectors] = useState([]);
  const [writers, setWriters] = useState([]);
  const [stars, setStars] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const fetchTrailerKey = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
      );

      const videos = response.data.results;

      if (videos.length > 0) {
        const trailer = videos.find((video) => video.type === "Trailer");

        if (trailer) {
          setTrailerKey(trailer.key);
        }
      }
    } catch (error) {
      console.error("Error fetching trailer key:", error);
    }
  };

  useEffect(() => {
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;

    axios
      .get(apiUrl)
      .then((response) => {
        setMovie(response.data);
        fetchTrailerKey();
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [id, apiKey]);

  const fetchAdditionalDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
      );
      const creditsResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
      );

      const similarMoviesResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1`
      );

      const movieDetails = response.data;
      const credits = creditsResponse.data;

      const movieDirectors = credits.crew.filter(
        (member) => member.job === "Director"
      );
      const movieWriters = credits.crew.filter(
        (member) => member.department === "Writing"
      );
      const movieStars = credits.cast.slice(0, 3); // Get the first 3 cast members

      setMovie(movieDetails);
      setDirectors(movieDirectors);
      setWriters(movieWriters);
      setStars(movieStars);

      setMovie(movieDetails);
      const limitedSimilarMovies = similarMoviesResponse.data.results.slice(
        0,
        3
      );
      setSimilarMovies(limitedSimilarMovies);
    } catch (error) {
      console.error("Error fetching additional movie details:", error);
    }
  };

  useEffect(() => {
    fetchTrailerKey();
    fetchAdditionalDetails();
  }, [id, apiKey]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className=" py-8 flex-1 ">
        <div className="container mx-auto p-4">
          <div className="max-w-screen-xl mx-auto  overflow-hidden">
            <div className="flex flex-col gap-4 p-4">
              <div className="md:flex-shrink-0">
                {trailerKey && (
                  <div className="mt-4 w-full rounded-lg">
                    <iframe
                      title={`${movie.title} Trailer`}
                      width="100%"
                      height="315"
                      src={`https://www.youtube.com/embed/${trailerKey}`}
                      frameBorder="0"
                      allowFullScreen
                      className="rounded-lg object-center  object-contain"
                    ></iframe>
                  </div>
                )}
              </div>
              <div className="mt-4 grid grid-cols-12 gap-4  md:mt-6 md:gap-6 2xl:mt-[1.875rem] 2xl:gap-[1.875rem]">
                <div className="col-span-12 xl:col-span-8">
                  <div className=" flex  md:text-sm text-xs items-center gap-4">
                    <h2
                      className="text-sm font-semibold text-[#404040]"
                      data-testid="movie-title"
                    >
                      {movie.title}
                    </h2>
                    <p
                      className="text-gray-500 "
                      data-testid="movie-release-date"
                    >
                      {movie.release_date}
                    </p>
                    <p className="text-gray-500" data-testid="movie-runtime">
                      {movie.runtime}
                    </p>
                    <div className="flex items-center gap-2 text-gray-500">
                      {movie.genres.map((genre) => (
                        <div
                          key={genre.id}
                          className="rounded-full border text-xs border-[#F8E7EB] text-[#B91C1C] py-1 px-1.5"
                        >
                          {genre.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="">
                    <h2 className="font-bold text-xl">Overview</h2>
                    <p
                      className="mt-2 font-poppins font-normal text-sm text-gray-700"
                      data-testid="movie-overview"
                    >
                      {movie.overview}
                    </p>
                  </div>
                  <div className="flex flex-col ">
                    <div className="mt-2 font-normal inline-flex items-center">
                      <h2 className=" ">Directors:</h2>
                      <ul>
                        {directors.map((director, index) => (
                          <span
                            key={director.id}
                            className="text-[#BE123C] ml-2"
                          >
                            {index > 0 ? ", " : ""}
                            {director.name}
                          </span>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 font-normal inline-flex items-center">
                      <h2 className=" ">Writers:</h2>
                      <ul>
                        {writers.map((writer, index) => (
                          <span key={writer.id} className="text-[#BE123C] ml-2">
                            {index > 0 ? ", " : ""}
                            {writer.name}
                          </span>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4  font-normal inline-flex items-center">
                      <h2 className=" ">Stars:</h2>
                      <ul>
                        {stars.map((star, index) => (
                          <span key={star.id} className="text-[#BE123C] ml-2">
                            {index > 0 ? ", " : ""}
                            {star.name}
                          </span>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-1 col-span-12 xl:col-span-4">
                  <div className="flex flex-col gap-3 mb-6">
                    <button className="bg-[#BE123C] w-48  inline-flex items-center gap-1 text-white px-6 py-2 rounded-md">
                      <ImTicket /> See Showtimes
                    </button>

                    <button className="bg-[#F6E0E7] w-60 inline-flex items-center gap-1 text-black px-6 py-2 rounded-md">
                      <AiOutlineBars /> More watch options
                    </button>
                  </div>

                  <ul className="flex gap-4">
                    {similarMovies.map((similarMovie) => (
                      <img
                        key={similarMovie.id}
                        src={`https://image.tmdb.org/t/p/w500${similarMovie.poster_path}`}
                        alt={similarMovie.title}
                        className="h-48"
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieDetails;
