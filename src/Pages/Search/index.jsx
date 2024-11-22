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

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await get(
          `/recipes?name=${key}`
        );
        setRecipes(response.data.items);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes()
  }, []);
  return (
    <Layout>
      <div className="h-screen flex flex-col m-10">
        <SearchInput
          placeholder="cari berdasarkan nama atau deskripsi"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={onSearch}
        />
        <div className="flex flex-row items-center justify-between gap-2 mt-10"></div>
        <h1>Search Results for {key}</h1>
        <div className="flex flex-col gap-2 overflow-x-auto mt-10">
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
      </div>
    </Layout>
  );
};

export default SearchPage;
