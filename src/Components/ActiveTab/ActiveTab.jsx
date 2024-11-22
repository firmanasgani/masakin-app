import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import serving from "../../Asset/serving.svg";

const IngredientsList = ({ recipe }) => {
  const [howToCook, setHowToCook] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [tools, setTools] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("caraMasak");

  const { id } = useParams();

  const fetchRecipeDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://masakin-api-production.up.railway.app/recipes/${id}`
      );

      if (response.data && response.data.data && response.data.data.item) {
        setHowToCook(response.data.data.item.how_to_cooks || []);
        setIngredients(response.data.data.item.ingredient_groups || []);
        setTools(response.data.data.item.tools || []);
      } else {
        setHowToCook([]);
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Failed to fetch recipe details");
      console.error("Error fetching recipe details:", err);
    }
  };

  useEffect(() => {
    if (recipe && recipe.how_to_cooks) {
      setHowToCook(recipe.how_to_cooks);
      setIngredients(recipe.ingredient_groups || []);
      setTools(recipe.tools || []);
      setLoading(false);
    } else {
      fetchRecipeDetails();
    }
  }, [id, recipe]);

  if (loading) return <div className="text-center text-xl">Loading...</div>;

  if (error) return <div className="text-center text-red-600">{error}</div>;

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

  const informationTab = () => {
    return (
      <div>
        <div className="flex justify-between">
          <div className="flex gap-1"> 
            <img src={serving} alt="serving" />
            <p>{porsi} Porsi</p>
          </div>
          <div>
            <h3 className="font-bold">
              {activeTab === "bahan" && "Bahan-bahan"}
              {activeTab === "alat" && "Alat"}
              {activeTab === "caraMasak" && "Langkah Memasak"}
            </h3>
          </div>
          <div>
            {activeTab === "bahan" && (
              <p>{ingredients ? ingredients.length : 0} Bahan</p>
            )}
            {activeTab === "alat" && <p>{tools ? tools.length : 0} Alat</p>}
            {activeTab === "caraMasak" && (
              <p>{howToCook ? howToCook.length : 0} Langkah</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "bahan":
        return (
          <div>
            {informationTab()}
            <ul className="space-y-2 mt-2">
              {ingredients && ingredients.length > 0 ? (
                ingredients
                  .filter(
                    (ingredient_group) =>
                      ingredient_group.group_name === "Bahan Utama" ||
                      ingredient_group.group_name === "Bumbu Dasar"
                  )
                  .map((ingredient_group, index) => (
                    <li
                      key={index}
                      className="p-4 rounded-lg text-center">
                      <p>{ingredient_group.group_name}</p>
                      <ul className="space-y-2 mt-2">
                        {ingredient_group.ingredients &&
                        ingredient_group.ingredients.length > 0 ? (
                          ingredient_group.ingredients.map(
                            (ingredient, idx) => (
                              <li
                                key={idx}
                                className="bg-purple-100 p-2 rounded-lg ">
                                <p className="flex flex-row-reverse justify-between">
                                  <span>{ingredient.nama_bahan}</span>
                                  <span>{ingredient.takaran}</span>
                                </p>
                              </li>
                            )
                          )
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
            {informationTab()}

            <ul className="space-y-2 mt-2 p-4">
              {tools && tools.length > 0 ? (
                tools.map((tool, index) => (
                  <li
                    key={index}
                    className="bg-purple-100 p-1 rounded-lg p-2">
                    <p>{tool.nama_alat}</p>
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
          <div>
            {informationTab()}
            <ol className="space-y-2 p-4">
              {howToCook?.map((step, index) => (
                <li
                  key={index}
                  className="bg-purple-100 p-2 rounded-lg ">
                  <p>{step.description}</p>
                  {step.img_urls &&
                    parseImageUrls(step.img_urls).length > 0 && (
                      <div className="mt-2">
                        {parseImageUrls(step.img_urls).map((img, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={img}
                            alt={`howToCook ${step.id}`}
                            className="mt-2 rounded-lg "
                          />
                        ))}
                      </div>
                    )}
                </li>
              ))}
              {(!howToCook || howToCook.length === 0) && (
                <p>No cooking steps available</p>
              )}
            </ol>
          </div>
        );
    }
  };

  // Hardcoded portion
  const porsi = 4;

  return (
    <div className="container mx-auto p-2">
      <div className="flex justify-center justify-between mb-6 text-[#7E9f10] mt-4">
        <button
          onClick={() => setActiveTab("bahan")}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 
            ${
              activeTab === "bahan"
                ? "bg-[#7E9f10] text-white"
                : "bg-white text-[#7E9f10]"
            }`}>
          Bahan-bahan
        </button>
        <button
          onClick={() => setActiveTab("alat")}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 
            ${
              activeTab === "alat"
                ? "bg-[#7E9f10] text-white"
                : "bg-white text-[#7E9f10]"
            }`}>
          Alat
        </button>
        <button
          onClick={() => setActiveTab("caraMasak")}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 
            ${
              activeTab === "caraMasak"
                ? "bg-[#7E9f10] text-white"
                : "bg-white text-[#7E9f10]"
            }`}>
          Cara Masak
        </button>
      </div>

      {renderTabContent()}
    </div>
  );
};

export default IngredientsList;
