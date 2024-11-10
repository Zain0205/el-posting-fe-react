import Cookies from "js-cookie";
import NavItem from "./NavItem";
import { LuHome, LuPlus, LuUser } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });
      Cookies.remove("token");
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <section className="fixed bottom-0 left-0 right-0 bg-gray-900 border-slate-400 shadow-lg flex py-3 lg:top-0 lg:w-72 lg:flex-col lg:py-5 lg:justify-between">
      <div className="w-full">
        <div className="hidden lg:block text-white text-center">
          <h1 className="font-playWrite text-2xl">el posting</h1>
          <p className="mt-2">Sosial media sederhana keren</p>
        </div>
        <div className="flex justify-around lg:h-1/4 lg:mt-10 w-full lg:flex-col lg:justify-normal lg:gap-y-4">
          <NavItem
            to="/home"
            label="Home"
          >
            <LuHome className="text-2xl text-dark group-hover:text-primary lg:group-hover:text-white" />
          </NavItem>
          <NavItem
            to="/add-post"
            label="New Post"
          >
            <LuPlus className="text-2xl text-dark group-hover:text-primary lg:group-hover:text-white" />
          </NavItem>
          <NavItem
            to="/profile"
            label="Profile"
          >
            <LuUser className="text-2xl text-dark group-hover:text-primary lg:group-hover:text-white" />
          </NavItem>
        </div>
      </div>
      <div className="hidden lg:block px-5 items-center text-white">
        <button
          onClick={handleLogout}
          className="text-white cursor-pointer flex gap-x-3 py-2"
        >
          <LuLogOut className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </section>
  );
}

export default Navbar;
