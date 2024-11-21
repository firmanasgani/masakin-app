import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const IngredientsList = ({ recipe }) => {
  const [howToCook, setHowToCook] = useState(null); // state for how to cook steps
  const [ingredients, setIngredients] = useState(null); // Ingredients from the API
  const [tools, setTools] = useState(null); // Tools from the API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // General error state for fetching recipe details
  const [activeTab, setActiveTab] = useState("caraMasak"); // Active tab

  const { id } = useParams(); // Extract ID from the URL parameters

  // Fetch recipe details (steps, ingredients, and tools) from the API
  const fetchRecipeDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://masakin-api-production.up.railway.app/recipes/${id}`
      );

      // Log the response to verify its structure
      console.log(response.data, "API Response");

      if (response.data && response.data.data && response.data.data.item) {
        // Set the state with the received data
        setHowToCook(response.data.data.item.how_to_cooks || []); // Set howToCook
        setIngredients(response.data.data.item.ingredient_groups || []); // Set ingredients
        setTools(response.data.data.item.tools || []); // Set tools
      } else {
        setHowToCook([]);
      }

      setLoading(false); // Stop loading once data is fetched
    } catch (err) {
      setLoading(false);
      setError("Failed to fetch recipe details");
      console.error("Error fetching recipe details:", err);
    }
  };

  // Trigger fetch when `id` or `recipe` changes
  useEffect(() => {
    if (recipe && recipe.how_to_cooks) {
      // If `recipe` prop is passed and contains `how_to_cooks`, use it directly
      setHowToCook(recipe.how_to_cooks);
      setIngredients(recipe.ingredient_groups || []);
      setTools(recipe.tools || []);
      setLoading(false); // Stop loading once data is loaded
    } else {
      // Otherwise, fetch the data from the API
      fetchRecipeDetails();
    }
  }, [id, recipe]); // Fetch data when `id` or `recipe` changes

  // If data is still loading, show a loading message
  if (loading) return <div className="text-center text-xl">Loading...</div>;

  // If there is an error, show the error message
  if (error) return <div className="text-center text-red-600">{error}</div>;

  // Parsing image URLs in case they're in stringified JSON format
  const parseImageUrls = (img_urls) => {
    try {
      if (typeof img_urls === "string") {
        return JSON.parse(img_urls);
      } else if (Array.isArray(img_urls)) {
        return img_urls;
      }
    } catch (e) {
      console.error("Error parsing img_urls:", e);
    }
    return [];
  };

  // Render content based on active tab (ingredients, tools, or how to cook)
  const renderTabContent = () => {
    switch (activeTab) {
      case "bahan":
        return (
          <div>
            <ul className="space-y-2 mt-2">
              {ingredients && ingredients.length > 0 ? (
                ingredients.map((ingredient_group, index) => (
                  <li key={index} className="p-4 rounded-lg shadow-md text-center">
                    <p>{ingredient_group.group_name}</p>
                    <ul className="space-y-2 mt-2">
                      {ingredient_group.ingredients &&
                      ingredient_group.ingredients.length > 0 ? (
                        ingredient_group.ingredients.map((ingredient, idx) => (
                          <li key={idx} className="bg-purple-100 p-2 rounded-lg shadow-md">
                            <p className="flex justify-between">
                              <span>{ingredient.nama_bahan}</span>
                              <span>{ingredient.takaran}</span>
                            </p>
                          </li>
                        ))
                      ) : (
                        <p>No ingredients available in this group</p>
                      )}
                    </ul>
                  </li>
                ))
              ) : (
                <p>No ingredient groups available</p>
              )}
            </ul>
          </div>
        );

      case "alat":
        return (
          <div>
            <ul className="space-y-2">
              {tools && tools.length > 0 ? (
                tools.map((tool, index) => (
                  <li key={index} className="bg-purple-100 p-1 rounded-lg shadow-md">
                    <p>{tool.name}</p>
                  </li>
                ))
              ) : (
                <p>No tools available</p>
              )}
            </ul>
          </div>
        );

      case "caraMasak":
        return (
          <ol className="space-y-2">
            {howToCook && howToCook.length > 0 ? (
              howToCook.map((step, index) => (
                <li key={index} className="bg-purple-100 p-2 rounded-lg shadow-md">
                  <p>{step.description}</p>
                  {step.img_urls && parseImageUrls(step.img_urls).length > 0 && (
                    <div className="mt-2">
                      {parseImageUrls(step.img_urls).map((img, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={img}
                          alt={`howToCook ${step.id}`}
                          className="mt-2 rounded-lg shadow-md"
                        />
                      ))}
                    </div>
                  )}
                </li>
              ))
            ) : (
              <p>No cooking steps available</p>
            )}
          </ol>
        );

      default:
        return <p>Select a tab to view content</p>;
    }
  };

  return (
    <div className="container mx-auto p-2">
      <h2 className="text-lg font-semibold text-center mb-6">Recipe Details</h2>

      {/* Tab navigation */}
      <div className="flex justify-center justify-between mb-6 text-[#7E9f10]">
        <button
          onClick={() => setActiveTab("bahan")}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 
            ${activeTab === "bahan" ? "bg-[#7E9f10] text-white" : "bg-white text-[#7E9f10]"}`}
        >
          Bahan-bahan
        </button>
        <button
          onClick={() => setActiveTab("alat")}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 
            ${activeTab === "alat" ? "bg-[#7E9f10] text-white" : "bg-white text-[#7E9f10]"}`}
        >
          Alat
        </button>
        <button
          onClick={() => setActiveTab("caraMasak")}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 
            ${activeTab === "caraMasak" ? "bg-[#7E9f10] text-white" : "bg-white text-[#7E9f10]"}`}
        >
          Cara Masak
        </button>
      </div>

      {/* Render content based on active tab */}
      <div>{renderTabContent()}</div>
    </div>
  );
};

export default IngredientsList;
