import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { motion } from "framer-motion";
import axios from "../lib/axios";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/forgot-password", { email });

      if (response.status !== 200) {
        throw new Error("Failed to send reset password email");
      }

      console.log(response.data);
    } catch (err) {
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
          Ingin mengubah password? Masukkan email yang terdaftar dan kami akan mengirimkan link untuk mengubah password Anda.
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="mt-2 bg-white/10 rounded-xl max-w-md py-8 px-6 w-full"
      >
        <div className="mb-5 text-center">
          <h1 className="font-semibold text-white text-4xl">Reset Password</h1>
        </div>
        <form onSubmit={handleForgotPassword}>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            id="c-email"
            label="Email"
            placeholder="Email"
          />
          <Button>Reset Password</Button>
        </form>
      </motion.div>
    </section>
  );
}

export default ForgotPassword;
