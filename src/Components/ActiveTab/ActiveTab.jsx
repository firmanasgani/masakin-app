import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import serving from "../../Asset/serving.svg";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const IngredientsList = ({ recipe }) => {
  const [howToCook, setHowToCook] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [tools, setTools] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("bahan");
  const [ingredients_images, setIngredients_images] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const { id } = useParams();

  // console.log(howToCook, "howToCook");

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
        setIngredients_images(
          response.data.data.item.ingredient_groups[0].ingredients[1].image
        );
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
      setIngredients_images(
        recipe.ingredient_groups[0].ingredients[1].image || []
      );
      setLoading(false);
      console.log(recipe.ingredient_groups[0].ingredients[1].image, "popup");
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
              {activeTab === "bahan" && "Masakan"}
              {activeTab === "alat" && "Alat-alat"}
              {activeTab === "caraMasak" && "Cara Memasak"}
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
                    <li key={index} className="p-4 rounded-lg text-center">
                      <p>{ingredient_group.group_name}</p>
                      <ul className="space-y-2 mt-2">
                        {ingredient_group.ingredients &&
                        ingredient_group.ingredients.length > 0 ? (
                          ingredient_group.ingredients.map(
                            (ingredient, idx) => (
                              <li
                                key={idx}
                                onClick={() => showSwalIngredient(ingredient)}
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
                  <li key={index} className="bg-purple-100 p-1 rounded-lg p-2">
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
                <li key={index} className=" p-2 rounded-lg ">
                  <p>
                    {index + 1}.{step.description}
                  </p>
                  {step.images && parseImageUrls(step.images).length > 0 ? (
                    <div className="mt-2 flex flex-wrap justify-evenly">
                      {parseImageUrls(step.images).map((images, imgIndex) => {
                        console.log("Displaying image from URL:", images);
                        return (
                          <img
                            key={imgIndex}
                            src={images.img_url}
                            alt={`howToCook ${step.id}`}
                            style={{ width: "100px" }}
                            onClick={() => showSwalHowToCook(images.img_url)}
                            className="mt-2 rounded-lg"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/150"; // Placeholder image
                            }}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <p>No image available for this step</p>
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

  const showSwalIngredient = (ingredient) => {
    Swal.fire({
      text: ingredient.description,
      imageUrl: ingredient.image || "https://via.placeholder.com/150",
      imageWidth: 400,
      imageHeight: 200,
      width: "370px",
      imageAlt: "Custom image",
      confirmButtonText: `Kembali`,
      confirmButtonColor: "#DF184F",
      customClass: {
        confirmButton: "custom-confirm-button",
      },
    });
  };

  const showSwalHowToCook = (how_to_cooks) => {
    Swal.fire({
      imageUrl: how_to_cooks || "https://via.placeholder.com/150",
      imageWidth: 400,
      imageHeight: 200,
      width: "370px",
      imageAlt: "Custom image",
      confirmButtonText: `Kembali`,
      confirmButtonColor: "#DF184F",
      customClass: {
        confirmButton: "custom-confirm-button",
      },
    });

    const style = document.createElement("style");
    style.innerHTML = `
    .custom-confirm-button {
      width: 280px; 
      font-size: 16px;
    }
  `;
    document.head.appendChild(style);
  };

  return (
    <div className="container mx-auto font-[14.5px">
      <div className="flex justify-center justify-between mb-6 text-[#7E9f10] mt-4">
        <button
          onClick={() => setActiveTab("bahan")}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 
            ${
              activeTab === "bahan"
                ? "bg-[#7E9f10] text-white"
                : "bg-white text-[#7E9f10]"
            }`}>
          Masakan
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
          Cara Memasak
        </button>
      </div>

      {renderTabContent()}
    </div>
  );
};

export default IngredientsList;
