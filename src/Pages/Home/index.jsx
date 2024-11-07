const Home = () => {
    return (
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


        </div>
    )
}

export default Home

