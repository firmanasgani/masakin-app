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
import BottomNav from "../../Components/bottomNav";
import ActiveTab from "../../Components/ActiveTab/ActiveTab";

const RecipeDetails = () => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [recipeStar, setRecipeStar] = useState(0);
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeVideo, setRecipeVideo] = useState("");
  const [recipeDifficulty, setRecipeDifficulty] = useState(0);
  const [recipeTime, setRecipeTime] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.example.com/recipe-details");
        const data = await response.json();

        setRecipeName(data.name);
        setRecipeImage(data.image);
        setRecipeStar(data.Star);
        setRecipeDescription(data.description);
        setRecipeVideo(data.videoUrl);
        setRecipeDifficulty(data.difficulty);
        setRecipeTime(data.time);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderStars = (stars) => {
    const fullStars = Math.floor(stars);
    const halfStar = stars % 1 >= 0.5 ? 1 : 0;
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
    const fullDiff = Math.floor(difficulty);
    const halfDiff = difficulty % 1 >= 0.5 ? 1 : 0;
    const emptyDiff = 3 - fullDiff - halfDiff;

    return (
      <div className="flex gap-1 ">
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
          <img
            key="half"
            src={topikoki} 
            alt="Topikoki"
            className=""
          />
        )}
        {Array(emptyDiff)
          .fill()
          .map((_, index) => (
            <img
              key={`empty-${index}`}
              src={topikoki} 
              alt="Topikoki"
              className="filter grayscale text-xl mr-1"
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
    <div className="h-screen w-screen flex flex-col items-center justify-between bg-gray-100">
      <div className="p-6 px-6 bg-white rounded-lg shadow-lg max-w-sm w-full">
        <div className="w-full flex justify-start ">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-xl text-gray-700 cursor-pointer"
            onClick={() => window.history.back()}
          />
        </div>

        <h1 className="mt-2 text-3xl font-normal text-center">
          {recipeName || "Bulgogi"}
        </h1>

        <div className="mt-4 w-full">
          <img
            src={recipeImage || "https://food-fanatic-res.cloudinary.com/iu/s--v4QC2NtY--/t_full/cs_srgb,f_auto,fl_strip_profile.lossy,q_auto:420/v1629740866/beef-bulgogi-image.jpg"}
            alt={recipeName || "Bulgogi"}
            style={{ width: '100%', height: '145px' }}
            className="w-full h-auto object-cover rounded-xl shadow-md"
          />
        </div>

        <div className="flex justify-between mt-4 text-md">
          <div className="flex items-center justify-center text-gray-400 text-md">
            <div className="text-center">
              <span className="font-bold text-lg">
                <FontAwesomeIcon className="text-yellow-500 mr-2" />
              </span>
              {renderStars(recipeStar || 4.5)}
            </div>

            <div className="flex items-center justify-center text-gray-400 text-lg ml-2">
              <span className="font-bold text-md">
                <FontAwesomeIcon
                  icon={faClock}
                  className="text-gray-400 mr-1 text-xl"
                />
              </span>
              {recipeTime || "50"}
              <p className="text-center text-gray-400 ml-1 text-md">menit</p>
            </div>
          </div>

          <div className="flex items-center justify-center text-gray-400 text-lg ml-2">
            <div className="text-center flex-1">
              <span className="font-bold text-lg">
                <FontAwesomeIcon className="gap-5" />
              </span>
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

        <div className="flex-row text-[14.5px] font-">
          <p className="text-left mt-4 mb-3">
            {recipeDescription}
            Bulgogi adalah daging sapi panggang klasik khas Korea yang lezat,
            cocok dinikmati saat makan siang ataupun makan malam.
          </p>

          <p className="mb-3">
            Dengan langkah-langkah yang sederhana, Bulgogi sangat mudah untuk
            dibuat.
          </p>

          <p className="mb-3">
            Hidangkan Bulgogi bersama nasi dan kimchi untuk sensasi makan yang
            benar-benar autentik.
          </p>
        </div>

        <div
          className="mt-4 text-center bg-[#DF184F] p-2 rounded-xl cursor-pointer mt-9"
          onClick={openModal}>
          <span className="text-white font-normal">
            Lihat Video Panduan Memasak
          </span>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="relative bg-white rounded-lg w-fit " style={{ width: '460px'}}>
              <button
                onClick={closeModal}
                className="absolute top-[-33px] right-2 text-white text-2xl">
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
              <div className="flex justify-center items-center">
                <iframe
                  src={recipeVideo || "https://www.youtube.com/embed/74a_Y1QPACg"}
                  style={{ width: '100%', height: '315px' }}
                  allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                  title="Cooking Video"></iframe>
              </div>
            </div>
          </div>
        )}

        <div>
          <ActiveTab />
        </div>

        <div><BottomNav /></div>
      </div>
    </div>
  );
};

export default RecipeDetails;
