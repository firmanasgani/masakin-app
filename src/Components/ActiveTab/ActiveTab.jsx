import React, { useState, useEffect, useCallback } from "react";
import serving from "../../Asset/serving.svg";

function ActiveTab() {
  const [activeTab, setActiveTab] = useState("Bahan-bahan");
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageDescription, setImageDescription] = useState(null);
  const [error, setError] = useState(null);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setSelectedImage(null);
    setImageDescription(null);
  };

  const handleItemClick = (image, description) => {
    setSelectedImage(image);
    setImageDescription(description);
  };

  const fetchData = useCallback(() => {
    setError(null);
    fetch("/Data/recipes.json")
      .then((response) => response.json())
      .then((recipeData) => {
        const tabData = recipeData[activeTab] || [];
        if (tabData.length > 0) {
          setData(tabData);
        } else {
          setError("Data not found for the active tab");
        }
      })
      .catch((err) => {
        setError(`Error fetching data: ${err.message}`);
      });
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderDataList = (data) => {
    if (data.length > 0) {
      return data.map((item, index) => (
        <li
          key={index}
          className="bg-purple-100 p-2 rounded-lg shadow-sm cursor-pointer"
          onClick={() => handleItemClick(item.image, item.description)} 
        >
          {item.name}
        </li>
      ));
    } else {
      return <li>No data available</li>;
    }
  };

  return (
    <div className="mt-4 text-[14.5px] font-semibold">
      <ul className="flex justify-between text-white">
        {["Bahan-bahan", "Alat-alat", "Cara Masak"].map((tab) => (
          <li
            key={tab}
            className={`p-2 px-4 rounded-xl cursor-pointer ${
              activeTab === tab ? "bg-[#7E9f10]" : "bg-white text-[#7E9f10]"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>

      <div className="mt-4 p-4">
        <div className="flex justify-between items-center">
          <div className="text-gray-400 mt-2 font-normal">
            <span className="flex items-center">
              <img src={serving} alt="serving" className="mr-1" />
              {4} Porsi
            </span>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">
              {activeTab === "Bahan-bahan" ? "Masakan" : activeTab}
            </h3>
          </div>

          <div className="flex justify-between items-center mt-2">
            {activeTab === "Bahan-bahan" ||
            activeTab === "Alat-alat" ||
            activeTab === "Cara Masak" ? (
              <span className="text-sm text-gray-400 font-normal">
                {activeTab === "Bahan-bahan" && `${data.length} bahan`}
                {activeTab === "Alat-alat" && `${data.length} alat`}
                {activeTab === "Cara Masak" && `${data.length} langkah`}
              </span>
            ) : null}
          </div>
        </div>

        {error && <p className="text-red-500 mt-2">{`Error: ${error}`}</p>}

        <div>
          <ul className="list-none space-y-2 mt-5">{renderDataList(data)}</ul>
        </div>

        {selectedImage && (
          <div className="mt-4 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg">
              <img
                src={selectedImage}
                alt={selectedImage}
                style={{ width: "100%", height: "auto" }}
              />
              <div>
                <p>{imageDescription}</p>
              </div>
              <button
                onClick={() => setSelectedImage(null)} 
                className="mt-2 bg-red-500 text-white p-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ActiveTab;
