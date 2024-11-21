import { useContext, useState } from "react";
import { SearchInput } from "../../Components/Inputs";
import Layout from "../Layout";
import CardNewRecipes from "../../Components/Cards/CardNewRecipes";
import CardPopularRecipes from "../../Components/Cards/CardPopularRecipes";
import { useFetchLatestRecipes } from "../../hooks/useFetchLatestRecipes";
import { useFetchPopularRecipe } from "../../hooks/useFetchPopularRecipe";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";
const Home = () => {
  const { user } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const { recipes, error, loading } = useFetchLatestRecipes();
  const { recipes: popularRecipes, error: popularError, loading: popularLoading } = useFetchPopularRecipe();
  const [search, setSearch] = useState("");
  const onSearch = () => {};

  if (!user) {
    return <Navigate to="/signin" />;
  }

  const handleLogout = () => {};
  return (
    <Layout>
      <div className="h-screen flex flex-col m-10">
        <div className="flex flex-row items-center justify-between gap-2 mt-10">
          <div className="text-2xl font-bold">Hello {user.full_name}</div>
          <div className="relative">
            <div
              className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="font-bold text-white text-2xl">
                {user.full_name.charAt(0)}
              </span>
            </div>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="text-md">Ingin rasa apa hari ini?</div>
        <SearchInput
          placeholder="cari berdasarkan nama atau deskripsi"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={onSearch}
        />

        <div className="flex flex-col  gap-2 mt-10">
          <h1 className="text-xl font-bold">Resep Baru</h1>
          {loading ? (
            <div className="flex justify-center items-center text-gray-500 text-lg">Loading...</div>
          ) : error ? (
            <div>{error.message}</div>
          ) : (
            <div className="flex flex-row gap-2 overflow-x-auto">
              {recipes.map((recipe) => (
                <CardNewRecipes recipe={recipe} key={recipe.id} />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col  gap-2 mt-10">
          <h1 className="text-xl font-bold">Resep Poupular</h1>
          {popularLoading ? (
            <div className="flex justify-center items-center text-gray-500 text-lg">Loading...</div>
          ) : popularError ? (
            <div>{popularError.message}</div>
          ) : (
            <div className="flex flex-row gap-2 overflow-x-auto">
              {popularRecipes.map((recipe) => (
                <CardPopularRecipes recipe={recipe} key={recipe.id} />
              ))}
            </div>
          )}
        </div>


      </div>
    </Layout>
  );
};

export default Home;
