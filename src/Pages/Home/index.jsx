import { useContext, useState } from "react";
import { SearchInput } from "../../Components/Inputs";
import Layout from "../Layout";
import CardNewRecipes from "../../Components/Cards/CardNewRecipes";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";
import { useLatestRecipesFetch } from "../../hooks/useLatestRecipesFetch";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const { recipes: latestRecipes, loading } = useLatestRecipesFetch();

  if (!user) {
    return <Navigate to={"/signin"} replace />;
  }

  return (
    <Layout>
      <div className="h-screen flex flex-col m-10">
        <div className="flex flex-row items-center justify-between gap-2 mt-10">
          <div className="text-2xl font-bold">Hello {user.full_name}</div>
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="font-bold text-white text-2xl">
              {user.full_name.charAt(0)}
            </span>
          </div>
        </div>
        <div className="text-md">Ingin rasa apa hari ini?</div>
        <SearchInput placeholder="cari berdasarkan nama atau deskripsi" value={search} onChange={(e) => setSearch(e.target.value)} onSearch={onSearch} />
        <div className="flex flex-row items-center justify-center gap-2 mt-10">
          <div className="flex flex-row flex-nowrap gap-2 mt-5 overflow-x-auto scrollbar-none  no-scrollbar">
            {[
              "Semua",
              "Indonesia",
              "Japan",
              "Korea",
              "China",
              "Thailand",
              "Vietnam",
              "Malaysia",
              "Singapore",
              "Philippines",
              "India",
            ].map((country, i) => (
              <a
                role="button"
                href="#"
                key={i}
                className={`px-2 py-1 rounded ${activeCategory === country.name
                    ? "bg-green-500 text-white border-2 border-green-500"
                    : ""
                  }`}
                onClick={() => setActiveCategory()}
              >
                {country}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-row  gap-2 mt-10">
          <h1 className="text-xl font-bold">Resep Baru</h1>
        </div>
        <div className="flex flex-row gap-x-2 mt-5 overflow-x-scroll overflow-y-hidden no-scrollbar z-50 h-[200rem]">
          {!loading &&
            latestRecipes.items.map((food, i) => (
              <CardNewRecipes key={i} food={food} />
            ))}
        </div>

        
        <div className="flex flex-row  gap-2 mt-10">
          <h1 className="text-xl font-bold">Resep Populer</h1>
        </div>
        <div className="flex flex-col flex-wrap gap-2 mt-5 overflow-x-auto scrollbar-none  no-scrollbar">
          {["Soto Ayam Lamongan", "Sushi", "Kimbab", "Pad Thai", "Soto"].map(
            (food, i) => (
              <div
                key={i}
                className="relative w-[200px] h-[150px] border border-gray-300 rounded-md overflow-hidden"
                style={{
                  backgroundImage: `url(https://picsum.photos/200/300?random=${i})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-transparent to-black bg-opacity-50 p-2 flex flex-col gap-1 w-full">
                  <h1 className="text-xl font-bold text-white">{food}</h1>
                  <div className="flex flex-row gap-1 text-sm">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className="text-yellow-500 text-xs material-icons"
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-row justify-between gap-1">
                    <span className="text-white flex items-center gap-1">
                      <span className="material-icons">access_time</span>
                      30 min
                    </span>
                    <span className="text-white material-icons">bookmark</span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
