import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Recomendation from "../components/Recomendation";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

function AddPostForm() {
  return (
    <>
      {!localStorage.getItem("token") ? (
        <Navigate to="/" />
      ) : (
        <section className="min-h-screen flex items-center bg-background lg:pl-72 lg:pr-96">
          <Navbar />
          <div className="min-h-screen p-5 lg:px-56 w-full">
            <h1 className="text-white text-2xl font-roboto tracking-wide mb-5">Add New Post</h1>
            <PostForm />
          </div>
          <Recomendation />
        </section>
      )}
    </>
  );
}

export default AddPostForm;
