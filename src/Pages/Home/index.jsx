import { useState } from "react";
import { SearchInput } from "../../Components/Inputs";
import Layout from "../Layout";
import CardNewRecipes from "../../Components/Cards/CardNewRecipes";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");

  return (
    <Layout>
      <div className="h-screen flex flex-col m-10">
        <div className="flex flex-row items-center justify-between gap-2 mt-10">
          <div className="text-2xl font-bold">Hello Budi</div>
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="font-bold text-white text-2xl">B</span>
          </div>
        </div>
        <div className="text-md">Ingin rasa apa hari ini?</div>
        <SearchInput placeholder="cari berdasarkan nama atau deskripsi" />
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
              <div
                key={i}
                className={`px-2 py-1 rounded ${
                  activeCategory === country
                    ? "bg-green-500 text-white border-2 border-green-500"
                    : ""
                }`}
                onClick={() => setActiveCategory(country)}
              >
                {country}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-row  gap-2 mt-10">
          <h1 className="text-xl font-bold">Resep Baru</h1>
        </div>
        <div className="flex flex-col flex-wrap gap-2 mt-5 overflow-x-auto scrollbar-none  no-scrollbar h-[1200px]">
          {["Soto Ayam Lamongan", "Sushi", "Kimbab", "Pad Thai", "Soto"].map(
            (food, i) => (
              <CardNewRecipes key={i} food={food} />
            )
          )}
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
                      <span key={index} className="text-yellow-500 text-xs material-icons">star</span>
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
          )}</div>
      </div>
    </Layout>
  );
};

export default Home;
