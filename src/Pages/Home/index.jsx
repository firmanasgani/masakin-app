import { useState } from "react";
import { SearchInput } from "../../Components/Inputs";
import Layout from "../Layout";
import CardNewRecipes from "../../Components/Cards/CardNewRecipes";
import PopularRecipes from "../../Components/Cards/CardPopularRecipes";
import { useEffect } from "react";
import { get } from "../../utils/ApiInterceptors";



const Home = () => {
  const [activeCategory, setActiveCategory] = useState({ name: "Semua" });
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState([]);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const countryName = await get("/recipes?page=1&per_page=100");
        const items = countryName.data.items
        setCountry([
          { name: "Semua" },
          ...items.reduce((acc, item) => {
            const categoryName = item.category.name.split(" ")[0];
            if (!acc.some((a) => a.name === categoryName)) {
              acc.push({ name: categoryName, id: item.category.id });
            }
            return acc;
          }, []),
        ]);

      } catch (error) {
        console.error("Error fetching country:", error);
      }
    };

    const fetchRecipesByCreatedBy = async () => {
      try {
        const recipes = await get("/recipes?page=1&per_page=10&difficulty=1&sort_by=created_at&order=desc");
        setRecipes(recipes.data.items);
        console.log(recipes.data.items)
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    }

    fetchCountry();
    fetchRecipesByCreatedBy()
  }, []);



  const onSearch = () => {
    alert("Kau cari " + search);
  };

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
        <SearchInput placeholder="cari berdasarkan nama atau deskripsi" value={search} onChange={(e) => setSearch(e.target.value)} onSearch={onSearch} />
        <div className="flex flex-row items-center justify-center gap-2 mt-10">
          <div className="flex flex-row flex-nowrap gap-2 mt-5 overflow-x-auto scrollbar-none  no-scrollbar">
            {country.map((country, i) => (
              <div
                key={i}
                className={`px-2 py-1 rounded ${activeCategory === country.name
                    ? "bg-green-500 text-white border-2 border-green-500"
                    : ""
                  }`}
                onClick={() => setActiveCategory()}
              >
                {country.name}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-row  gap-2 mt-10">
          <h1 className="text-xl font-bold">Resep Baru</h1>
        </div>
        <div className="flex gap-2 mt-5 h-full w-full scrollbar-hide whitespace-nowrap">
          {recipes.map(
            (recipe, i) => (
              <CardNewRecipes key={i} recipe={recipe} />
            )
          )}
        </div>

        
        <div className="flex flex-row  gap-2 mt-10">
          <h1 className="text-xl font-bold">Resep Populer</h1>
        </div>
        <div className="flex gap-2 mt-5 h-full scrollbar-hide whitespace-nowrap">
          {recipes.map(
            (recipe, i) => (
              <PopularRecipes key={i} recipe={recipe} />
            )
          )}</div>
      </div>
    </Layout>
  );
};

export default Home;
