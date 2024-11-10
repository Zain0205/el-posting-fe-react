
function Recomendation() {
  return (
    <section className="hidden border-l xl:w-1/2 lg:w-2/3 h-screen border-gray-900 shadow-lg lg:flex py-3 lg:flex-col lg:py-5 lg:justify-between z-100">
      <div className="px-5 text-white">
        <h1 className="font-roboto text-2xl mb-2">Rekomendasi</h1>
        <RecomendationCard />
        <RecomendationCard />
        <RecomendationCard />
        <RecomendationCard />
        <RecomendationCard />
        <RecomendationCard />
      </div>
    </section>
  );
}

function RecomendationCard(){
  return (
    <div className="flex items-center gap-3 bg-background py-3 rounded-lg">
      <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
      <div>
        <h1 className="text-white">Username</h1>
        <p className="text-white text-sm">Followed by 1000 people</p>
      </div>
    </div>
  );
} 

export default Recomendation;
