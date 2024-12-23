function ProfileLoading() {
  return (
    <div
      className="max-w-xl w-full mx-auto animate-pulse rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="relative">
      <div className="h-32 w-32 bg-gray-500 rounded-full mx-auto mt-6">

      </div>
      </div>

      {/* Profile Info */}
      <div className="text-center px-6 py-4">
        <h1 className="text-xl font-semibold text-white w-20 bg-gray-500 h-4 my-1 mx-auto rounded-lg"></h1>
        <p className="text-gray-600 text-sm mt-2">{"Add Bio"}</p>

        <div className="flex justify-center items-center gap-6 mt-4">
          <div className="text-center flex items-center gap-x-2">
            <p className="text-gray-500 text-sm">Followers</p>
          </div>
          <div className="text-center flex items-center gap-x-2">
            <p className="text-gray-500 text-sm">Following</p>
          </div>
          <div className="text-center flex items-center gap-x-2">
            <p className="text-gray-500 text-sm">Posts</p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-6 pb-6">
          <div className="flex gap-x-5 mt-2">
            <button
              className={`w-full py-5 px-4 ${true ? "bg-gray-500 hover:bg-gray-300" : "bg-blue-500 hover:bg-blue-600 text-white"} text-gray-800 font-bold rounded-md shadow-md focus:outline-none`}
            >
            </button>
            <button
              className="w-full py-5 px-4 bg-gray-500 text-gray-800 font-bold rounded-md shadow-md hover:bg-gray-300 focus:outline-none"
            >
            </button>
          </div>
      </div>
    </div>
  );
}

export default ProfileLoading;
