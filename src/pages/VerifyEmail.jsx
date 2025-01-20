import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../lib/axios";
import { motion } from "framer-motion";

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(`/auth/verify-email/${token}`);
        setStatus("success");
        setTimeout(() => navigate("/"), 3000);
      } catch (error) {
        setStatus("error");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <section className="h-screen bg-background flex items-center justify-center px-5 flex-col gap-y-5">
      <div className="text-center max-w-md text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl mb-3 font-playWrite"
        >
          {status === "verifying" && "Verifying your email..."}
          {status === "success" && "Email verified!"}
          {status === "error" && "Verification failed"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {status === "success" && "Your email has been verified. Redirecting to login..."}
          {status === "error" && "The verification link is invalid or has expired."}
        </motion.p>
      </div>
    </section>
  );
}

export default VerifyEmail;
