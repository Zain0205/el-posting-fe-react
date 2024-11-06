import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Recomendation from "../components/Recomendation";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import axios from "../lib/axios";

function Home() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const handleGetPost = async () => {
      try {
        const response = await axios.get("/post/feed");
        console.log(response.data);
        if (response.status === 200) {
          setPostList(response.data);
        }
        console.log(postList);
      } catch (err) {
        console.error("error");
      }
    };

    handleGetPost();
  }, []);

  return (
    <>
      {!localStorage.getItem("token") ? (
        <Navigate to="/" />
      ) : (
        <section className="min-h-screen flex items-center bg-background lg:pl-72 lg:pr-96">
          <Navbar />
          <div className="min-h-screen p-5 lg:px-56 w-full">
            <h1 className="text-white mx-auto max-w-lg text-2xl font-roboto tracking-wide">HomeFeed</h1>
            {postList.map((post) => (
              <PostCard
                key={post.id}
                content={post.content}
                img={post.img_url}
                username={post.username}
                like={post.like_count}
              />
            ))}
          </div>
          <Recomendation />
        </section>
      )}
    </>
  );
}

export default Home;
