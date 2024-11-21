import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout>
     
        <div className="flex flex-col items-center justify-center h-1/2">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-lg text-gray-600 mb-8">
            Halaman yang Anda cari tidak ditemukan.
          </p>
          <button
            onClick={() => navigate("/home")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Kembali ke Beranda
          </button>
        </div>

        
    </Layout>
  );
};

export default NotFound;
