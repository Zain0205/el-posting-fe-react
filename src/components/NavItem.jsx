import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function NavItem({ children, label, to }) {
  return (
    <>
      <Link
        to={to}
        className="group"
      >
        <motion.div
          initial={{
            y: 0,
          }}
          whileHover={{
            y: -5,
          }}
          className="flex flex-col items-center text-center text-white md:flex-row md:hover:bg-gradient-to-r from-teal-400 md:py-3 to-secondaryDark md:px-5"
        >
          {children}
          <span className="text-sm mt-1 lg:ml-3 font-semibold text-dark group-hover:text-primary md:group-hover:text-white">{label}</span>
        </motion.div>
      </Link>
    </>
  );
}

export default NavItem;
