import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../Layout";
import { SearchInput } from "../../Components/Inputs";
import { get } from "../../utils/ApiInterceptors";
import PopularRecipes from "../../Components/Cards/CardPopularRecipes";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const key = urlParams.get("key") || "";
  const onSearch = () => {
    window.location.href = `/search?key=${search}`;
  };
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await get(
          `/recipes?name=${key}`
        );
        setRecipes(response.data.items);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);
  return (
    <Layout>
      <div className="h-screen flex flex-col m-10">
        <h1 className="text-3xl font-bold mb-5 text-center">Search Recipes</h1>
        <SearchInput
          placeholder="cari berdasarkan nama atau deskripsi"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={onSearch}
        />
        <div className="flex flex-row items-center justify-between gap-2 mt-10"></div>
        <h1>Search Results for {key}</h1>
        <div className="flex flex-col gap-2 overflow-x-auto mt-10">
          {loading ? (
            <div className="flex flex-row items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="text-lg">Loading...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recipes.length > 0 ? (
                  recipes.map((item, index) => (
                    index % 2 === 0 && (
                      <div className="flex flex-row gap-2" key={item.id}>
                        <PopularRecipes recipe={item} />
                        {recipes[index + 1] && (
                          <PopularRecipes recipe={recipes[index + 1]} />
                        )}
                      </div>
                    )
                  ))
              ) : (
                <p className="text-center text-lg">Recipes not found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;

