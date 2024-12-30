import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Link } from "react-router-dom";
import RecomendationCard from "./RecomendationCard";

function Recomendation() {
  const [recomendationList, setRecomendationList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleGetUser = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/profile/recomend", { withCredentials: true });
        setRecomendationList(response.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.error(err);
      }
    };

    handleGetUser();
  }, []);

  return (
    <section className="hidden border-r border-l xl:w-1/2 lg:w-2/3 h-screen border-gray-900 shadow-lg lg:flex py-3 lg:flex-col lg:py-5 lg:justify-between z-100">
      <div className="px-5 text-white">
        <h1 className="font-roboto text-2xl mb-2">Rekomendasi</h1>
        {isLoading && <RecomendationLoader />}
        {recomendationList.map((r) => (
          <RecomendationCard
            key={r.id}
            id={r.id}
            username={r.username}
            img={r.img_url}
            followers={r.follower_count}
          />
        ))}
      </div>
    </section>
  );
}

function RecomendationLoader() {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="animate-pulse rounded-full bg-gray-500 h-16 w-16" />
      <div className="space-y-2">
        <div className="animate-pulse rounded-md bg-gray-500 h-4 w-[200px]"> </div>
        <div className="animate-pulse rounded-md bg-gray-500 h-4 w-[170px]"> </div>
      </div>
    </div>
  );
}

export default Recomendation;
