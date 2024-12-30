import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { motion } from "framer-motion";
import axios from "../lib/axios";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

function Login() {
  const [userLogin, setUserLogin] = useState({
    email: null,
    password: null,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldType, setFieldType] = useState("password");

  const navigate = useNavigate();

  const handleLoginData = (fieldname, e) => {
    const temp = { ...userLogin };
    temp[fieldname] = e.target.value;

    setUserLogin(temp);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post("/auth/login", userLogin);

      if (response.status !== 200) {
        throw new Error("Failed to Login");
      }

      if (response.data) {
        const decoded = jwtDecode(response.data.token);
        console.log(decoded);
        Cookies.set("id", decoded.id);
        Cookies.set("token", response.data.token);
      }

      setIsLoading(false);

      navigate("/home");
    } catch (err) {
      setIsLoading(false);
      setError(err.response.data.message);
      console.error(err);
    }
  };

  return (
    <section className="h-screen bg-background flex items-center justify-center px-5 flex-col gap-y-5">
      <div className="text-center max-w-md text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-white text-4xl mb-3 font-playWrite"
        >
          el posting
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-white"
        >
          El Posting adalah platform sosial media untuk berbagi foto, teks dengan teman secara mudah.
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="mt-2 bg-white/10 rounded-xl max-w-md py-8 px-6 w-full"
      >
        <div className="mb-5 text-center">
          <h1 className="font-semibold text-white text-4xl">Login</h1>
        </div>
        <form onSubmit={handleLoginSubmit}>
          <Input
            onChange={(e) => handleLoginData("email", e)}
            id="l-email"
            label="Email"
            placeholder="Email"
          />
          <div className="relative">
            <Input
              onChange={(e) => handleLoginData("password", e)}
              id="l-password"
              label="Password"
              type={fieldType}
              placeholder="Password"
            />
            {fieldType === "password" ? (
              <LuEyeOff
                onClick={() => setFieldType("text")}
                className="absolute cursor-pointer text-xl right-3 top-11 text-white"
              />
            ) : (
              <LuEye
                onClick={() => setFieldType("password")}
                className="absolute cursor-pointer text-xl right-3 top-11 text-white"
              />
            )}
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button disabled={isLoading}>
            <div className="flex items-center justify-center gap-x-2">
              {isLoading && <div className="w-5 h-5 border-2 border-t-blue-500 border-gray-300 rounded-full animate-spin" />}
              {isLoading ? "Loading..." : "Login"}
            </div>
          </Button>
          <p className="text-center mt-4  text-white">
            Belum punya akun?{" "}
            <Link
              className="cursor-pointer ml-1"
              to="/register"
            >
              Buat akun
            </Link>
          </p>
          <Link to="forgot-password">
            <p className="my-2 text-sm text-center text-white">Lupa password?</p>
          </Link>
        </form>
      </motion.div>
    </section>
  );
}

export default Login;
