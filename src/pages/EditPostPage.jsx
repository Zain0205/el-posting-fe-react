import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Recomendation from "../components/Recomendation";
import Cookies from "js-cookie";
import EditPostForm from "../components/EditPostForm";

function EditPostPage() {
  return (
    <>
      {/* {!Cookies.get("token") ? (
        <Navigate to="/" />
      ) : ( */}
        <section className="min-h-screen flex items-center bg-background md:pl-72">
          <Navbar />
          <div className="h-screen overflow-scroll p-5 w-full">
            <h1 className="text-white text-xl mx-auto max-w-lg lg:text-2xl font-roboto tracking-wide mb-5">Edit Your Post</h1>
            <EditPostForm />
          </div>
          <Recomendation />
        </section>
      {/* )} */}
    </>
  )
}

export default EditPostPage
