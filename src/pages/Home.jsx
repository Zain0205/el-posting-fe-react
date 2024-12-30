import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Recomendation from "../components/Recomendation";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import Cookies from "js-cookie";
import { AnimatePresence, motion } from "framer-motion";
import { LuLogOut } from "react-icons/lu";
import { LuSearch } from "react-icons/lu";
import RecomendationCard from "../components/RecomendationCard";

function Home() {
  const [postList, setPostList] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

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

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios.get(`/profile/search`, {
          params: {
            username: search,
          },
        });

        console.log(response.data);
        setSearchResult(response.data);
      } catch (err) {
        console.error("error");
      }
    };

    handleSearch();
  }, [search]);

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });
      Cookies.remove("token");
      Cookies.remove("id");
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      {!Cookies.get("token") ? (
        <Navigate to="/" />
      ) : (
        <section className="h-screen flex bg-background md:pl-72 pb-24">
          <Navbar handleLogout={handleLogout} />
          <div className="h-screen p-5 w-full overflow-scroll">
            <div className="text-white max-w-lg mx-auto flex items-center justify-between w-full md:hidden">
              <h1 className="font-roboto text-xl">HomeFeed</h1>
              <LuLogOut
                onClick={handleLogout}
                className="text-xl cursor-pointer"
              />
            </div>
            <h1 className="text-white hidden md:block mx-auto max-w-lg text-2xl font-roboto tracking-wide">HomeFeed</h1>
            <div className="max-w-lg mx-auto mt-2 relative">
              <div className="relative">
                <input
                  id="search-input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search For Profile"
                  className="w-full px-4 py-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <LuSearch
                  onClick={() => setTest((prev) => !prev)}
                  className="absolute top-5 cursor-pointer right-4 text-xl text-white"
                />
              </div>
              <AnimatePresence>
                {search.length !== 0 && (
                  <motion.div
                    key="box"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`h-72 w-full z-[100] overflow-scroll px-4 py-2 ${searchResult.length === 0 ? "flex items-center justify-center" : "" } bg-gray-900 rounded-lg sticky top-12`}
                  >
                    {searchResult.length === 0 && <p className="text-white text-center">No Result</p>}
                    {searchResult.map((r) => (
                      <RecomendationCard
                        key={r.id}
                        id={r.id}
                        username={r.username}
                        img={r.img_url}
                        followers={r.follower_count}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {postList.map((post) => (
              <PostCard
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
            ))}
          </div>
          <Recomendation />
        </section>
      )}
    </>
  );
}

export default Home;
