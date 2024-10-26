import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { motion } from "framer-motion";

function Login() {
  return (
    <section className="h-screen bg-background flex items-center justify-center px-5 flex-col gap-y-5">
      <div className="text-center max-w-md text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6, delay: .5 }} 
          className="text-white text-4xl mb-3 font-playWrite">el posting</motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6, delay: 1 }} 
          className="text-white"
        >El Posting adalah platform sosial media untuk berbagi foto, teks dengan teman secara mudah.</motion.p> 
      </div>
      <motion.div 
        initial={{ opacity: 0, }} 
        whileInView={{ opacity: 1,}} 
        transition={{ duration: 1, }} 
        className="mt-2 bg-white/10 rounded-xl max-w-md py-8 px-6 w-full">
        <div className="mb-5 text-center">
          <h1 className="font-semibold text-white text-4xl">Login</h1>
        </div>
        <form action="">
          <Input label="Email" placeholder="Email" />
          <Input label="Password" placeholder="Password" />
          <Button>Login</Button>
          <p className="text-center mt-4  text-white">
            Belum punya akun?{" "}
            <Link className="cursor-pointer ml-1" to="/register">
              Buat akun
            </Link>
          </p>
        </form>
      </motion.div>
    </section>
  );
}

export default Login;
