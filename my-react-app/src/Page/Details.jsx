import { useState } from "react";
import Sidebar from "../component/Sidebar";
import MovieDetails from "./MovieDetails";

const Details = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Content */}
      <div className={`flex-1 overflow-y-auto ${isSidebarOpen ? "ml-48" : ""}`}>
        <MovieDetails />
      </div>
    </div>
  );
};

export default Details;
