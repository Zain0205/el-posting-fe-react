import { Link } from "react-router-dom"
import defaultProfile from "../assets/images/defaultProfile.png";

function RecomendationCard({ username, id, img, followers }) {
  return (
    <Link to={`/profile/${id}`}>
      <div className="flex items-center gap-3 bg-transparent py-3 rounded-lg">
        <div className="w-16 h-16 bg-gray-400 overflow-hidden rounded-full">
          <img
            src={img ? `http://localhost:3000${img}` : defaultProfile}
            alt=""
          />
        </div>
        <div>
          <h1 className="text-white font-semibold">{username}</h1>
          <p className="text-white text-sm">Followed by {followers} people</p>
        </div>
      </div>
    </Link>
  )
}

export default RecomendationCard
