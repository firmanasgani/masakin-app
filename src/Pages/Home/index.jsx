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
            <div className="text-md">Ingin rasa apa hari ini</div>
            <div className="flex flex-row items-center justify-center gap-2 mt-10">
                <input type="text" className="border-2 border-gray-400 rounded-md p-2 w-[80%]" placeholder="cari berdasarkan nama atau deskripsi" />
                <button className="bg-red-400 text-white rounded-md p-2 w-[20%]">Cari</button>
            </div>
            <div className="flex flex-row items-center justify-center gap-2 mt-10">
                <div className="flex flex-row flex-nowrap gap-2 mt-5 overflow-x-auto scrollbar-none">
                    {["Semua", "Indonesia", "Japan", "Korea", "China", "Thailand", "Vietnam", "Malaysia", "Singapore", "Philippines", "India"].map((country, i) => (
                        <div key={i} className={`px-2 py-1 rounded ${i === 0 ? 'bg-green-500 text-white border-2 border-green-500' : ''}`}>
                            {country}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-row  gap-2 mt-10">
                <h1 className="text-2xl font-bold">
                    Resep Baru
                </h1>
            </div>

            <div className="flex flex-row  gap-2 mt-10">
                <h1 className="text-2xl font-bold">
                    Resep Populer
                </h1>
            </div>


        </div>
      </Layout>
    )
}

export default Home

