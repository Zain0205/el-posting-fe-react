import React from "react";
import { Navigate } from "react-router-dom";
import Appbar from "../components/Appbar";

function Home() {
  return (
    <>
      {!localStorage.getItem("token") ? (
        <Navigate to="/" />
      ) : (
        <section className="h-[200vh] flex items-center justify-center bg-background">
          <Appbar />
          <div className="h-56 w-56 bg-white"></div>
        </section>
      )}
    </>
  );
}

export default Home;
