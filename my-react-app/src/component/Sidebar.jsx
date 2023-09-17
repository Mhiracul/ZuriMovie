import { Link } from "react-router-dom";
import logo from "../assets/Logo.svg";
import { GoHome } from "react-icons/go";
import { GrLogout } from "react-icons/gr";
import { FiMenu, FiX } from "react-icons/fi";
import { GiVideoCamera } from "react-icons/gi";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { CgCalendarDates } from "react-icons/cg";
import { useState } from "react";
function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger icon */}
      <button
        className="md:hidden fixed right-4 top-4 z-10 p-2 rounded-md bg-white"
        onClick={toggleSidebar}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <div
        className={`w-48 bg-white border rounded-tr-[50px] rounded-br-[50px] border-gray-300 flex  flex-col h-screen ${
          isOpen ? "md:flex" : "hidden md:flex"
        }`}
      >
        <div className="mt-6 mb-12 p-3">
          <Link to="/" className="text-black">
            <img src={logo} alt="Logo" className="w-40 h-12 " />
          </Link>
        </div>
        <ul className="space-y-10">
          <li className="hover:bg-[#f5c5d1] p-2 rounded-none cursor-pointer hover:border-r-4 hover:border-[#BE123C]">
            <Link
              to="/"
              className="flex items-center gap-2.5 font-semibold text-xl hover:text-[#BE123C] text-[#666666]  duration-300 ease-in-out px-4 py-2"
            >
              <GoHome size={18} />
              Home
            </Link>
          </li>
          <li className="hover:bg-[#f5c5d1] p-2 rounded-none cursor-pointer hover:border-r-4 hover:border-[#BE123C]">
            <Link
              to="/"
              className="flex items-center gap-2.5 font-semibold text-xl hover:text-[#BE123C] text-[#666666]  duration-300 ease-in-out px-4 py-2"
            >
              {" "}
              <GiVideoCamera size={18} />
              Movies{" "}
            </Link>
          </li>{" "}
          <li className="hover:bg-[#f5c5d1] p-2 rounded-none cursor-pointer hover:border-r-4 hover:border-[#BE123C]">
            <Link
              to="/"
              className="flex items-center gap-2.5 font-semibold text-xl hover:text-[#BE123C] text-[#666666]  duration-300 ease-in-out px-4 py-2"
            >
              {" "}
              <MdOutlineOndemandVideo size={18} />
              Tv Series{" "}
            </Link>
          </li>
          <li className="hover:bg-[#f5c5d1] p-2 rounded-none cursor-pointer hover:border-r-4 hover:border-[#BE123C]">
            <Link
              to="/"
              className="flex items-center gap-2.5 font-semibold text-xl hover:text-[#BE123C] text-[#666666]  duration-300 ease-in-out px-4 py-2"
            >
              {" "}
              <CgCalendarDates size={18} />
              Upcoming{" "}
            </Link>
          </li>
        </ul>
        <div className="flex-grow "></div>
        <div className=" p-2 mb-8">
          <li className="hover:bg-gray-100 p-2 flex font-semibold text-xl items-center gap-2.5 text-[#666666] rounded list-none cursor-pointer px-4 py-2">
            {" "}
            <GrLogout /> Logout
          </li>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
