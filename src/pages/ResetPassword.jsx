import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { motion } from "framer-motion";
import axios from "../lib/axios";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import Cookies from "js-cookie";

function ResetPassword() {
  const [fieldType, setFieldType] = useState("password");
  const [confirmFieldType, setConfirmFieldType] = useState("password");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const payload = {
      newPassword: password,
      confirmPassword,
    };

    try {
      const response = await axios.post(`/auth/reset-password/${token}`, payload);

      if (response.status !== 200) {
        throw new Error("Failed to reset password");
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
        <form onSubmit={handleResetPassword }>
          <div className="relative">
            <Input
              onChange={(e) => setPassword(e.target.value)}
              id="r-p"
              type={fieldType}
              label="New Password"
              placeholder="New Password"
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
          <div className="relative">
            <Input
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="r-cp"
              type={confirmFieldType}
              label="Confirm Password"
              placeholder="Confirm Password"
            />
            {confirmFieldType === "password" ? (
              <LuEyeOff
                onClick={() => setConfirmFieldType("text")}
                className="absolute cursor-pointer text-xl right-3 top-11 text-white"
              />
            ) : (
              <LuEye
                onClick={() => setConfirmFieldType("password")}
                className="absolute cursor-pointer text-xl right-3 top-11 text-white"
              />
            )}
          </div>
          <Button>Reset Password</Button>
        </form>
      </motion.div>
    </section>
  );
}

export default ResetPassword;
