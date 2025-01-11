import { Link, Navigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Recomendation from "../components/Recomendation";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import Cookies from "js-cookie";
import { LuLogOut } from "react-icons/lu";
import { LuArrowLeft } from "react-icons/lu";

function PostDetail() {
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const id = Cookies.get("id");

  useEffect(() => {
    const handleGetPost = async () => {
      try {
        const response = await axios.get(`/post/detail/${postId}`);
        if (response.status === 200) {
          setPost(response.data[0]);
        }
      } catch (err) {
        console.error("error");
      }
    };

    handleGetPost();
  }, []);

  return (
    <>
      {/* {!Cookies.get("token") ? (
        <Navigate to="/" />
      ) : ( */}
        <section className="min-h-screen flex bg-background md:pl-72 ">
          <Navbar />
          <div className="h-screen p-5 w-full overflow-scroll">
            <div className="text-white max-w-lg mx-auto flex items-center justify-between w-full md:hidden">
              <h1 className="font-roboto text-xl flex items-center gap-x-2">
                <Link to={`/profile/${id}`}>
                  <LuArrowLeft />
                </Link>
                Post Detail
              </h1>
              <LuLogOut className="text-xl" />
            </div>
            <h1 className="text-white hidden md:flex items-center gap-x-2 mx-auto max-w-lg text-2xl font-roboto tracking-wide">
              <Link to={`/profile/${id}`}>
                <LuArrowLeft />
              </Link>
              Post Detail
            </h1>
            <PostCard
              detail
              key={post.id}
              postId={post.id}
              userId={post.user_id}
              content={post.content}
              profile={post.profile_img}
              img={post.img_url}
              username={post.username}
              time={post.created_at}
              like={post.like_count}
            />
          </div>
          <Recomendation />
        </section>
      {/* )} */}
    </>
  );
}

export default PostDetail;
