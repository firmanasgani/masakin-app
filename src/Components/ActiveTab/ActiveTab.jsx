import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const IngredientsList = ({recipe}) => {
  const [steps, setSteps] = useState([]);
  const [ingredients, setIngredients] = useState(null); // Ingredients from the first API
  const [additionalIngredients, setAdditionalIngredients] = useState([]); // Ingredients from the second API
  const [tools, setTools] = useState([]); // Tools from the first API
  const [additionalTools, setAdditionalTools] = useState([]); // Additional tools from the second API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // General error state for fetching recipe details
  const [ingredientsError, setIngredientsError] = useState(null); // Error state for ingredients
  const [toolsError, setToolsError] = useState(null); // Error state for tools
  const [activeTab, setActiveTab] = useState("Cara masak"); // Tab yang aktif: caraMasak, bahan, atau alat

  console.log(ingredients, "recipe") 


  const [id] = useState(useParams().id);



  // Fetch recipe details (steps, ingredients, and tools) from the first API
  const fetchRecipeDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://masakin-api-production.up.railway.app/recipes/${id}`);
      console.log(response.data.data.item.ingredient_groups, "reponse");
      
      if (response.data) {
        setSteps(response.data.data.item.steps || []);
        setIngredients(response.data.data.item.ingredient_groups || []); // Ingredients from the first API
        setTools(response.data.data.item.tools || []); // Tools from the first API
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Failed to fetch recipe details"); // General error message
    }
  };

  // Fetch ingredients from the second API
//   const fetchAdditionalIngredients = async () => {
//     try {
//       const response = await axios.get(`https://masakin-api-production.up.railway.app/recipes/${id}/ingredients`);
//       if (response.data) {
//         setAdditionalIngredients(response.data.ingredients || []);
//         setIngredientsError(null); // Clear any previous errors
//       }
//     } catch (err) {
//       setIngredientsError("Failed to fetch ingredients"); // Specific error for ingredients
//       setAdditionalIngredients([]); // Clear previous data
//     }
//   };

  // Fetch tools from the second API
  const fetchTools = async () => {
    try {
      const response = await axios.get(`https://masakin-api-production.up.railway.app/recipes/${id}/tools`);
      if (response.data) {
        setAdditionalTools(response.data.tools || []);
        setToolsError(null); // Clear any previous errors
      }
    } catch (err) {
      setToolsError("Failed to fetch tools"); // Specific error for tools
      setAdditionalTools([]); // Clear previous data
    }
  };

  useEffect(() => {
    // fetchRecipeDetails(); // Fetch initial data (ingredients, steps, and tools from the first API)
    // fetchAdditionalIngredients(); // Fetch additional ingredients from the second API
    // fetchTools(); // Fetch tools from the second API
    setIngredients(recipe.ingredient_groups);
    setLoading(false);
    console.log(recipe.ingredient_groups, "ingredient_groups");
  }, [id, recipe]);

  // If the data is still loading, show a loading state
  if (loading && !error) return <div className="text-center text-xl">Loading...</div>;
  
  // Show a general error message if the fetch failed
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

  const renderTabContent = () => {
    switch (activeTab) {
      case "bahan":
        return (
          <div>
            {/* Ingredients from the first API */}
            {/* <ul className="space-y-2">
              {ingredients.length > 0 ? (
                ingredients.map((ingredient, index) => (
                  <li key={index} className="bg-red-500 p-4 rounded-lg shadow-md">
                    <p>{ingredient.name}</p>
                  </li>
                ))
              ) : (
                <p>No ingredients available from the first API</p>
              )}
            </ul> */}

            {/* Error or data from the second API */}
            <ul className="space-y-2 mt-2">
                  { ingredients && (
                    ingredients.map((ingredient_group, index) => (
                      <li key={index} className="bg-purple-100 p-4 rounded-lg shadow-md">
                        <p>{ingredient_group.group_name}</p>
                        
                      </li>
                    ))
                  ) 
                  }
                </ul>
          </div>
        );
      case "alat":
        return (
          <div>
            {/* Tools from the first API */}
            <ul className="space-y-2">
              {tools.length > 0 ? (
                tools.map((tool, index) => (
                  <li key={index} className="bg-purple-100 p-1 rounded-lg shadow-md">
                    <p>{tool.name}</p>
                  </li>
                ))
              ) : (
                <p>No tools available from the first API</p>
              )}
            </ul>

            {/* Error or data from the second API */}
            {toolsError ? (
              <p className="text-red-600">{toolsError}</p>
            ) : (
              <>
                <ul className="space-y-2 mt-2">
                  {additionalTools.length > 0 ? (
                    additionalTools.map((tool, index) => (
                      <li key={index} className="bg-purple-100 p-1 rounded-lg shadow-md">
                        <p>{tool.name}</p>
                      </li>
                    ))
                  ) : (
                    <p>No additional tools available</p>
                  )}
                </ul>
              </>
            )}
          </div>
        );
      case "caraMasak":
      default:
        return (
          <ol className="space-y-2">
            {steps.length > 0 ? (
              steps.map((step) => (
                <li key={step.id} className="bg-purple-100 p-2 rounded-lg shadow-md">
                  <p>{step.description}</p>
                  {step.img_urls && parseImageUrls(step.img_urls).length > 0 && (
                    <div className="mt-2">
                      {parseImageUrls(step.img_urls).map((img, index) => (
                        <img key={index} src={img} alt={`Step ${step.id}`} className="mt-2 rounded-lg shadow-md"/>
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
    }
  };

  return (
    <div className="container mx-auto p-2">
      <h2 className="text-lg font-semibold text-center mb-6">Recipe Details</h2>
      
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
