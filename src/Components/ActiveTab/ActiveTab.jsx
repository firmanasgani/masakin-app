import React, { useState, useEffect } from "react";

function ActiveTab() {
  const [activeTab, setActiveTab] = useState("Bahan-bahan");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const fetchData = async () => {
      setError(null); // Reset error before fetching new data
      let data = [];
      switch (activeTab) {
        case "Bahan-bahan":
          data = [
            "2 cangkir tepung terigu",
            "1 sendok teh garam",
            "1 sendok makan gula",
            "1/2 cangkir air",
            "1 butir telur",
            "100 gram mentega",
          ];
          break;
        case "Alat-alat":
          data = [
            "Mangkuk besar",
            "Pengaduk adonan",
            "Cetakan kue",
            "Saringan tepung",
            "Spatula",
          ];
          break;
        case "Cara Masak":
          data = [
            "1. Campurkan tepung terigu, garam, dan gula dalam mangkuk besar.",
            "2. Tambahkan telur dan air, aduk rata hingga adonan tercampur.",
            "3. Masukkan mentega dan aduk hingga adonan kalis.",
            "4. Diamkan adonan selama 15 menit.",
            "5. Ambil sejumput adonan dan cetak sesuai selera.",
            "6. Panggang di oven dengan suhu 180°C selama 15-20 menit.",
            "7. Sajikan kue setelah dingin.",
          ];
          break;
        default:
          return;
      }

      // Simulate a delay for fetching (just like calling an API)
      setTimeout(() => {
        setData(data);
      }, 1000);
    };

    fetchData();
  }, [activeTab]); // Fetching data setiap kali activeTab berubah

  return (
    <div className="mt-4 text-[14.5px] font-semibold">
      <ul className="flex justify-between text-white">
        <li
          className={`p-2 px-4 rounded-xl cursor-pointer ${
            activeTab === "Bahan-bahan"
              ? "bg-[#7E9f10]"
              : "bg-white text-[#7E9f10]"
          }`}
          onClick={() => handleTabClick("Bahan-bahan")}
        >
          Bahan-bahan
        </li>
        <li
          className={`p-2 px-4 rounded-xl cursor-pointer ${
            activeTab === "Alat-alat"
              ? "bg-[#7E9f10]"
              : "bg-white text-[#7E9f10]"
          }`}
          onClick={() => handleTabClick("Alat-alat")}
        >
          Alat-alat
        </li>
        <li
          className={`p-2 px-4 rounded-xl cursor-pointer ${
            activeTab === "Cara Masak"
              ? "bg-[#7E9f10]"
              : "bg-white text-[#7E9f10]"
          }`}
          onClick={() => handleTabClick("Cara Masak")}
        >
          Cara Masak
        </li>
      </ul>

      <div className="mt-4 p-4">
        <h3 className="text-lg font-semibold">{activeTab}</h3>

        {/* Error State */}
        {error && <p className="text-red-500">Error: {error}</p>}

        {/* Data Display */}
        <div>
          {activeTab === "Bahan-bahan" && (
            <ul className="list-none space-y-1">
              {data.length > 0 ? (
                data.map((item, index) => (
                  <li
                    key={index}
                    className="bg-purple-100 p-2 rounded-lg shadow-sm"
                  >
                    {item}
                  </li>
                ))
              ) : (
                <li>No bahan-bahan available</li>
              )}
            </ul>
          )}

          {activeTab === "Alat-alat" && (
            <ul className="list-none space-y-1">
              {data.length > 0 ? (
                data.map((item, index) => (
                  <li
                    key={index}
                    className="bg-purple-100 p-2 rounded-lg shadow-sm"
                  >
                    {item}
                  </li>
                ))
              ) : (
                <li>No alat-alat available</li>
              )}
            </ul>
          )}

          {activeTab === "Cara Masak" && (
            <ul className="list-decimal pl-6 space-y-1">
              {data.length > 0 ? (
                data.map((step, index) => (
                  <li
                    key={index}
                    className="bg-purple-100 p-2 rounded-lg shadow-sm"
                  >
                    {step}
                  </li>
                ))
              ) : (
                <li>No cara masak available</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActiveTab;
