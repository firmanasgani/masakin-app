import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faStar,
  faStarHalfAlt,
  faBookBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { faClock, faCircleXmark } from "@fortawesome/free-regular-svg-icons";

import topikoki from "../../Asset/topikoki.svg";
import ActiveTab from "../../Components/ActiveTab/ActiveTab";
import Layout from "../Layout";

import axios from "axios";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const [id] = useState(useParams().id);
  const [recipeName, setRecipeName] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [recipeStar, setRecipeStar] = useState(0);
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeVideo, setRecipeVideo] = useState("");
  const [recipeDifficulty, setRecipeDifficulty] = useState(0);
  const [recipeTime, setRecipeTime] = useState("");
  const [ingredient_groups, setIngredient_groups] = useState(null);


  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getRecipeAndRatings = async () => {
      try {
        // Fetch recipe details
        const recipeResponse = await axios.get(
          `https://masakin-api-production.up.railway.app/recipes/${id}`
        );
        const recipeData = recipeResponse.data.data.item;
        setRecipe(recipeData);

        // Set initial recipe state
        setRecipeName(recipeData.name);
        setRecipeImage(recipeData.img_banner);
        setRecipeStar(recipeData.rating ? recipeData.rating.stars : 0);
        setRecipeDescription(recipeData.description);
        setRecipeVideo(recipeData.video_url);
        setRecipeDifficulty(recipeData.difficulty);
        setRecipeTime(recipeData.estimated_time);
        setIngredient_groups(recipeData.ingredient_groups);
        setRecipe(recipeData);

        console.log(recipeData.difficulty, "Difficulty Value");

    
        console.log(recipeData.ingredient_groups, "reponse");

        // Fetch ratings
      } catch (error) {
        console.log(error);
      }
    };

    getRecipeAndRatings();
  }, [id]);

  const renderStars = (stars) => {
    const validStars = Number.isFinite(stars) ? stars : 0;
    const fullStars = Math.floor(validStars);
    const halfStar = validStars % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <div>
        {Array(fullStars)
          .fill()
          .map((_, index) => (
            <FontAwesomeIcon
              key={`full-${index}`}
              icon={faStar}
              className="text-yellow-500"
            />
          ))}
        {halfStar > 0 && (
          <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-500" />
        )}
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <FontAwesomeIcon
              key={`empty-${index}`}
              icon={faStar}
              className="text-gray-300"
            />
          ))}
      </div>
    );
  };

 const renderDifficulty = (difficulty) => {
  difficulty = difficulty > 3 ? 3 : difficulty; // set difficulty ke 3 jika lebih dari 3
  
  const fullDiff = Math.floor(difficulty);
  const halfDiff = difficulty % 1 >= 0.5 ? 1 : 0;
  const emptyDiff = 3 - fullDiff - halfDiff;

  return (
    <div className="flex gap-1">
      {Array(fullDiff)
        .fill()
        .map((_, index) => (
          <img
            key={`full-${index}`}
            src={topikoki}
            alt="Topikoki"
            className="flex"
          />
        ))}
      {halfDiff > 0 && (
        <img key="half" src={topikoki} alt="Topikoki" className="" />
      )}
      {Array(emptyDiff)
        .fill()
        .map((_, index) => (
          <img
            key={`empty-${index}`}
            src={topikoki}
            alt="Topikoki"
            className="filter grayscale"
          />
        ))}
    </div>
  );
};



  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="p-6 px-6 bg-white rounded-lg shadow-lg max-w-sm w-full">
        {/* Back button */}
        {recipe && (
          <>
            <div className="w-full flex justify-start">
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="text-xl text-gray-700 cursor-pointer"
                onClick={() => window.history.back()}
              />
            </div>

            {/* Title and Banner */}
            <div className="mt-2 text-2xl font-normal text-center">
              {recipeName}
            </div>
            <img
              src={recipeImage}
              alt={recipeName}
              style={{ width: "100%", height: "145px" }}
              className="w-full h-auto object-cover rounded-xl shadow-md"
            />

            {/* Recipe Info */}
            <div className="flex justify-between mt-4 text-sm">
              <div className="flex items-center justify-center text-gray-400 text-base">
                <div className="text-center">
                  <span className="font-bold text-lg">
                    <FontAwesomeIcon className="text-yellow-500 mr-2" />
                  </span>
                  {recipe && renderStars(recipe?.rating??0)}
                </div>

                <div className="flex items-center justify-center text-gray-400 text-lg ml-2">
                  <span className="font-bold text-md">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="text-gray-400 mr-1 text-xl"
                    />
                  </span>
                  <p className="text-base">{recipeTime}</p>
                </div>
              </div>

              <div className="flex items-center justify-center text-gray-400 text-lg ml-2">
                <div className="text-center flex-1">
                  <span className="font-bold text-lg"></span>
                  {renderDifficulty(recipeDifficulty || 2.1)}
                </div>

                <div className="text-center ml-4">
                  <span className="font-bold text-lg">
                    <FontAwesomeIcon
                      icon={faBookBookmark}
                      className="text-green-700 text-xl"
                    />
                  </span>
                </div>
              </div>
            </div>

            {/* Recipe Description */}
            <div className="flex-row text-[14.5px] ">
              <p className="text-left mt-4 mb-3 p-2">{recipeDescription}</p>
            </div>

            {/* Video Button */}
            <div
              className="mt-4 text-center bg-[#DF184F] p-2 rounded-xl cursor-pointer mt-9"
              onClick={openModal}>
              <span className="text-white font-normal">
                Lihat Video Panduan Memasak
              </span>
            </div>

            {/* Video Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                <div
                  className="relative bg-white rounded-lg w-fit "
                  style={{ width: "400px" }}>
                  <button
                    onClick={closeModal}
                    className="absolute top-[-33px] right-2 text-white text-2xl">
                    <FontAwesomeIcon icon={faCircleXmark} />
                  </button>
                  <div className="flex justify-center items-center">
                    <iframe
                      src={recipeVideo ||"https://storage.googleapis.com/masak-masak-file/video-1.mp4"}
                      style={{ width: "100%", height: "315px" }}
                      allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                      title="Cooking Video"></iframe>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <div>
          
          {recipe && <ActiveTab recipe={recipe}/>} 
        </div>
      </div>
    </Layout>
  );
};

export default RecipeDetails;
