import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/tv.svg";
import { HiOutlineBars2 } from "react-icons/hi2";
import { AiFillPlayCircle, AiOutlineClose } from "react-icons/ai";
import { BarLoader } from "react-spinners"; // Import the BarLoader component
import { FaSearch } from "react-icons/fa";

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}

function Banner() {
  const [movies, setMovies] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const apiKey = "83672d307b162a7a1a150ffb13438aba";
  const [topMovies, setTopMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading indicator

  useEffect(() => {
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;

    axios
      .get(apiUrl)
      .then((response) => {
        const fetchedTopMovies = response.data.results.slice(0, 5);

        const movieImages = fetchedTopMovies.map((movie) => {
          return `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
        });

        setMovies(movieImages);
        setTopMovies(fetchedTopMovies);
      })
      .catch((error) => {
        console.error("Error fetching movie images:", error);
      });
  }, [apiKey]);

  const currentMovie = movies[currentImageIndex];

  const handleSearchInputChange = (event) => {
    const searchText = event.target.value;
    setSearchInput(searchText);

    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchText}&page=1&include_adult=false`;

    axios
      .get(searchUrl)
      .then((response) => {
        const searchResults = response.data.results;
        setSearchResults(searchResults);
        setLoading(false);

        setShowModal(!!searchResults.length);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setLoading(false);
      });
  };
  const [isSearchOpen, setSearchOpen] = useState(false); // State to track if the search bar is open

  // Function to toggle the search bar
  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };
  const handleWatchTrailerClick = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${topMovies[currentImageIndex].id}/videos?api_key=${apiKey}&language=en-US`
      );

      const videos = response.data.results;

      if (videos.length > 0) {
        const trailer = videos.find((video) => video.type === "Trailer");

        if (trailer) {
          setShowTrailer(trailer.key);
        }
      }
    } catch (error) {
      console.error("Error fetching trailer key:", error);
    }
  };

  return (
    <div className="relative">
      {loading && (
        <div className="loader-container">
          <BarLoader
            color="#BE123C"
            height={4}
            width={100}
            css="margin: 0 auto;" // Optional: Customize loader's style
          />
        </div>
      )}
      {movies.length > 0 && (
        <div
          className="w-full h-full bg-fixed  bg-blend-overlay bg-black/20"
          style={{
            background: `linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)), url(${currentMovie})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "80vh",
          }}
        >
          <div
            className="absolute top-4 flex items-center mt-2 rounded md:hidden right-4 z-50 cursor-pointer"
            onClick={toggleSearch}
          >
            {isSearchOpen ? (
              <AiOutlineClose color="#ffffff" size={24} />
            ) : (
              <FaSearch color="#ffffff" size={24} />
            )}
          </div>

          {/* Search bar */}
          {isSearchOpen && (
            <div className="fixed block md:hidden top-16 w-full px-10 right-4 z-50">
              <input
                type="text"
                placeholder="Search for movies..."
                className="w-full p-2 text-sm bg-transparent border border-[#D1D5DB] rounded-md outline-none text-white"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
            </div>
          )}
          <div className="absolute container mx-auto px-4 inset-x-0 top-0 flex  flex-wrap items-center justify-between p-4">
            <div className="text-white order-md-1">
              <img src={logo} alt="Logo" className="h-10" />
            </div>

            <div className="text-white hidden flex-grow md:flex justify-center order-md-3">
              <input
                type="text"
                placeholder="What do you want to watch?"
                className="md:w-full  max-w-xl px-4 z-50 py-1 text-sm bg-transparent border border-[#D1D5DB] rounded-md outline-none text-white"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
            </div>
            <div className="md:flex items-center gap-4  hidden">
              <div className="text-white">
                <Link className="hover:text-red-600 text-sm font-bold transition-colors duration-300">
                  Sign Up
                </Link>
              </div>
              <button className="bg-[#BE123C] rounded-full p-0.5 ">
                <HiOutlineBars2 color="#ffffff" size={20} />
              </button>
            </div>
          </div>

          <div className="absolute container mx-auto px-4 inset-0 flex items-center">
            <div className="text-white">
              <h1 className="text-3xl mb-3 text-[#BE123C] font-semibold">
                {topMovies[currentImageIndex].title}
              </h1>
              <p className="text-sm text-white font-medium max-w-xs">
                {truncateText(topMovies[currentImageIndex].overview, 150)}
              </p>
              <button
                className="bg-[#BE123C] inline-flex items-center gap-2 text-sm rounded-md mt-2 p-1"
                onClick={handleWatchTrailerClick}
              >
                <AiFillPlayCircle /> Watch Trailer
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed container mx-auto  inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white overflow-y-auto h-80 p-4 rounded-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute  right-9 bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
            <h2 className="text-2xl font-semibold mb-2">Search Results!</h2>
            {searchResults.map((movie) => (
              <div
                key={movie.id}
                className="flex items-center gap-3 space-y-2 mb-2 object-contain"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt=""
                  className="w-32 h-32"
                />
                <p>Title: {movie.title}</p>
                <hr className="my-2" />
              </div>
            ))}
          </div>
        </div>
      )}

      {showTrailer && (
        <div className="fixed container mx-auto inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="w-full h-80 p-4 rounded-lg">
            <button
              onClick={() => setShowTrailer(false)}
              className="bg-red-600 text-white  px-4 py-2 rounded-lg mt-4"
            >
              <AiOutlineClose />
            </button>

            <div className="w-full rounded-md">
              <iframe
                title={`${topMovies[currentImageIndex].title} Trailer`}
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${showTrailer}`}
                frameBorder="0"
                allowFullScreen
                className="rounded-lg object-center object-contain"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-1/2 transform -translate-y-1/2 right-4 flex flex-col items-center space-y-2">
        {movies.map((_, index) => (
          <div
            key={index}
            className={`text-white cursor-pointer ${
              index === currentImageIndex ? "font-bold" : "opacity-50"
            }`}
            onClick={() => setCurrentImageIndex(index)}
          >
            {index === currentImageIndex ? `-${index + 1}` : index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Banner;
