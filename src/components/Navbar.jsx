import Cookies from "js-cookie";
import NavItem from "./NavItem";
import { LuHome, LuPlus, LuUser } from "react-icons/lu";
import { LuMessageCircle } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";

function Navbar({ handleLogout }) {
  const id = Cookies.get("id");

  return (
    <section className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-slate-400 shadow-lg flex py-3 md:top-0 md:w-72 md:flex-col md:py-5 md:justify-between">
      <div className="w-full">
        <div className="hidden md:block text-white text-center">
          <h1 className="font-playWrite text-2xl">el posting</h1>
          <p className="mt-2">Sosial media sederhana keren</p>
        </div>
        <div className="flex justify-around lg:h-1/4 md:mt-10 w-full md:flex-col md:justify-normal md:gap-y-4">
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
            to={`/profile/${id}`}
            label="Profile"
          >
            <LuUser className="text-2xl text-dark group-hover:text-primary lg:group-hover:text-white" />
          </NavItem>
          <NavItem
            to={`/chat/inbox`}
            label="Chat"
          >
            <LuMessageCircle className="text-2xl text-dark group-hover:text-primary lg:group-hover:text-white" />
          </NavItem>
        </div>
      </div>
      <div className="hidden md:block px-5 items-center text-white">
        <button
          onClick={handleLogout}
          className="text-white pr-7 cursor-pointer flex gap-x-3 py-2"
        >
          <LuLogOut className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </section>
  );
}

export default Navbar;
