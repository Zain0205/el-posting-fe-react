import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Recomendation from "../components/Recomendation";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import Cookies from "js-cookie";
import { LuLogOut } from "react-icons/lu";

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
      {!Cookies.get("token") ? (
        <Navigate to="/" />
      ) : (
        <section className="min-h-screen flex bg-background lg:pl-72 ">
          <Navbar />
          <div className="h-screen p-5 w-full overflow-scroll">
            <div className="text-white flex items-center justify-between w-full lg:hidden">
              <h1 className="font-roboto text-xl">HomeFeed</h1>
              <LuLogOut className="text-xl" />
            </div>
            <h1 className="text-white hidden lg:block mx-auto max-w-lg text-2xl font-roboto tracking-wide">HomeFeed</h1>
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
