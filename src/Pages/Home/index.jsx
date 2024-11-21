import { useContext, useEffect, useState } from "react";
import { SearchInput } from "../../Components/Inputs";
import Layout from "../Layout";
import CardNewRecipes from "../../Components/Cards/CardNewRecipes";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";
import { useLatestRecipesFetch } from "../../hooks/useLatestRecipesFetch";
import { get } from "../../utils/ApiInterceptors";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [country, setCountry] = useState("Semua")
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const items = await get("/recipes?page=1&per_page=100");
      const countrys = Array.from(
        new Set(
          items.data.items
            .map((item) => item.category.name.split(" ")[0])
            .filter((v, i, a) => a.indexOf(v) === i)
        )
      );

      console.log(countrys);
      setRecipes(items.data.items);
    };
    fetchRecipes();
  }, []);

  const [search, setSearch] = useState("");
  const onSearch = () => {};

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
        <SearchInput
          placeholder="cari berdasarkan nama atau deskripsi"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={onSearch}
        />
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
                className={`px-2 py-1 rounded ${
                  activeCategory === country.name
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
        <div className="flex flex-row gap-x-2 mt-5 overflow-x-scroll overflow-y-hidden no-scrollbar z-50 h-[200rem]"></div>

        <div className="flex flex-row  gap-2 mt-10">
          <h1 className="text-xl font-bold">Resep Populer</h1>
        </div>
        
      </div>
    </Layout>
  );
};

export default Home;
