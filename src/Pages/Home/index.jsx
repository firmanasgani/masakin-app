import Layout from "../Layout"

const Home = () => {
    return (
      <Layout>
          <div className="h-screen flex flex-col m-10">
              <div className="flex flex-row items-center justify-between gap-2 mt-10">
                <div className="text-2xl font-bold">Hello Indra</div>
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="font-bold text-white text-2xl">I</span>
                </div>

              </div>
            <div className="text-md">Ingin rasa apa hari ini?</div>
            <div className="flex flex-row items-center justify-center gap-2 mt-10">
                <input type="text" className="border-2 border-gray-400 rounded-md p-2 w-[80%]" placeholder="cari berdasarkan nama atau deskripsi" />
                <button className="bg-red-400 text-white rounded-md p-2 w-[20%]">Cari</button>
            </div>
            <div className="flex flex-row items-center justify-center gap-2 mt-10">
                <div className="flex flex-row flex-nowrap gap-2 mt-5 overflow-x-auto scrollbar-none  no-scrollbar">
                    {["Semua", "Indonesia", "Japan", "Korea", "China", "Thailand", "Vietnam", "Malaysia", "Singapore", "Philippines", "India"].map((country, i) => (
                        <div key={i} className={`px-2 py-1 rounded ${i === 0 ? 'bg-green-500 text-white border-2 border-green-500' : ''}`}>
                            {country}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-row  gap-2 mt-10">
                <h1 className="text-xl font-bold">
                    Resep Baru
                </h1>
                
            </div>
            <div className="flex flex-row flex-nowrap gap-2 mt-5 overflow-x-auto scrollbar-none  no-scrollbar">
                {["Nasi Goreng", "Sushi", "Kimbab", "Pad Thai", "Soto"].map((food, i) => (
                    <div key={i} className="flex flex-col bg-gray-300 justify-between gap-2 w-[250px] p-2 bg-white rounded-md shadow-md h-[250px]">
                        <img src={`https://picsum.photos/200/300?random=${i}`} alt={food} className="rounded-t-md object-fit h-[100px]" />
                        <div className="font-bold text-center text-sm">{food}</div>
                        <div className="flex flex-row gap-1">
                            {[1,2,3,4,5].map((star, j) => (
                                <span key={j} className="text-yellow-500">&#9733;</span>
                            ))}
                        </div>
                        <div className="mt-auto flex flex-row items-center justify-between">
                            <span className="text-gray-500 text-sm">30 menit</span>
                            <span className="text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-row  gap-2 mt-10">
                <h1 className="text-xl font-bold">
                    Resep Populer
                </h1>
            </div>


        </div>
      </Layout>
    )
}

export default Home

