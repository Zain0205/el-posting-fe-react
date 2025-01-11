import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "../lib/axios";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

function Register() {
  const navigate = useNavigate();

  const [users, setUsers] = useState({
    username: null,
    email: null,
    password: null,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldType, setFieldType] = useState("password");

  const handleRegister = (fieldname, e) => {
    const temp = { ...users };

    temp[fieldname] = e.target.value;
    setUsers(temp);
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post("/auth/register", users);
      if (response.status === 201) {
        navigate("/");
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.response.data.message);
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
          <h1 className="font-semibold text-white text-4xl">Register</h1>
        </div>
        <form onSubmit={handleSubmitRegister}>
          <Input
            onChange={(e) => handleRegister("username", e)}
            name="user-f"
            id="r-username"
            label="Username"
            placeholder="Username"
            required
          />
          <Input
            onChange={(e) => handleRegister("email", e)}
            type="email"
            name="email-f"
            id="r-email"
            label="Email"
            placeholder="Email"
            required
          />
          <div className="relative">
            <Input
              onChange={(e) => handleRegister("password", e)}
              name="password-f"
              type={fieldType}
              id="r-password"
              label="Password"
              placeholder="Password"
              required
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
              {isLoading ? "Loading..." : "Register"}
            </div>
          </Button>
          <p className="text-center mt-4  text-white">
            Sudah punya akun?
            <Link
              className="cursor-pointer ml-1"
              to="/"
            >
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </section>
  );
}

export default Register;
