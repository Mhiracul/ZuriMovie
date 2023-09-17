import Sidebar from "../component/Sidebar";
import MovieDetails from "./MovieDetails";

const Details = () => {
  return (
    <div>
      <div className="flex w-full ">
        <Sidebar />
        <MovieDetails />
      </div>
    </div>
  );
};

export default Details;
