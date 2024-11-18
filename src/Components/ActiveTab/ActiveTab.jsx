import React, { useState, useEffect } from "react";
import serving from "../../Asset/serving.svg";

function ActiveTab() {
  const [activeTab, setActiveTab] = useState("Bahan-bahan"); // Keep activeTab as "Bahan-bahan"
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const recipeData = {
    "Bahan-bahan": [
      "500g Daging sapi tipis (biasanya menggunakan daging has dalam)",
      "3 sdm Kecap asin",
      "1 sdm Gula merah",
      "2 siung Bawang putih, cincang halus",
      "1 sdm Minyak wijen",
      "1/2 sdt Lada hitam",
      "1 sdm Jahe parut",
      "1 batang Daun bawang, iris tipis",
      "1 sdm Kecap manis",
      "1 sdm Air perasan lemon",
      "1 sdm Gochujang (pasta cabai Korea, opsional)",
    ],
    "Alat-alat": [
      "Wajan atau penggorengan",
      "Mangkok besar untuk marinasi",
      "Pisau tajam",
      "Talenan",
      "Sendok takar",
      "Spatula",
      "Brock"
    ],
    "Cara Masak": [
      "1. Potong daging sapi tipis-tipis melawan serat.",
      "2. Campurkan kecap asin, gula merah, bawang putih, minyak wijen, lada hitam, jahe, daun bawang, kecap manis, air perasan lemon, dan gochujang (jika menggunakan) dalam mangkuk besar.",
      "3. Masukkan daging ke dalam campuran bumbu dan aduk rata. Diamkan selama minimal 30 menit atau semalaman di dalam kulkas agar bumbu meresap.",
      "4. Panaskan wajan atau penggorengan dengan api sedang dan tambahkan sedikit minyak.",
      "5. Masukkan daging yang sudah dimarinasi dan masak hingga daging berubah warna dan matang merata, sekitar 5-7 menit.",
      "6. Sajikan Bulgogi dengan nasi putih hangat dan sayuran seperti selada atau kimchi.",
    ],
  };

  const servings = 4;

  const fetchData = () => {
    setError(null);

    const tabData = recipeData[activeTab] || [];
    if (tabData.length > 0) {
      setData(tabData);
    } else {
      setError("Data not found for the active tab");
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const renderDataList = (data) => {
    if (data.length > 0) {
      return data.map((item, index) => (
        <li key={index} className="bg-purple-100 p-2 rounded-lg shadow-sm">
          {item}
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
            onClick={() => handleTabClick(tab)}>
            {tab}
          </li>
        ))}
      </ul>

      <div className="mt-4 p-4">
        <div className="flex justify-between items-center">
          <div className="text-gray-400 mt-2 font-normal">
            <span className="flex items-center">
              <img src={serving} alt="serving" className="mr-1" />
              {servings} Porsi
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              {activeTab === "Bahan-bahan" ? "Masakan" : activeTab}
            </h3>
            <span className="text-sm text-gray-600">
              {activeTab === "Bahan-bahan" ||
              activeTab === "Alat-alat" ||
              activeTab === "Cara Masak"
                ? null
                : ""}
            </span>
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
      </div>
    </div>
  );
}

export default ActiveTab;
