import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Recomendation from "../components/Recomendation";
import defaultCover from "../assets/images/defaultCover.jpg";
import nature from "../assets/images/nature.jpg";

function Profile() {
  return (
    <>
      {!localStorage.getItem("token") ? (
        <Navigate to="/" />
      ) : (
        <section className="min-h-screen flex items-center bg-background lg:pl-72 lg:pr-96">
          <Navbar />
          <div className="min-h-screen w-full">
            <div className="w-full bg-gradient-to-r h-96 from-black relative flex justify-center items-center">
              {/* <div className="w-full h-96 absolute bg-gradient-to-r from-black"></div> */}
              <img
                src={nature}
                className="w-full h-full object-cover"
                alt=""
              />
              <div className="h-32 w-32 overflow-hidden rounded-full absolute -bottom-12 lg:-bottom-16 flex justify-center items-center">
                <img
                  src={defaultCover}
                  className="object-cover"
                  alt=""
                />
              </div>
            </div>
            <div className="text-white gap-x-10 flex justify-center mt-20 px-5">
              <h1 className="text-2xl font-semibold font-roboto">Profile Name</h1>
            </div>
          </div>
          <Recomendation />
        </section>
      )}
    </>
  );
}

export default Profile;
