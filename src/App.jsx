import React, { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [userdata, setUserData] = useState([])
  const [loading, setLoading] = useState(false)

  const getdata = async () => {
    try {
      setLoading(true)

      const response = await axios.get(
        "https://picsum.photos/v2/list?page=1&limit=30"
      )

      setUserData(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  let printuserdata = (
    <h1 className="text-center text-2xl font-semibold text-gray-400">
      No Images Available
    </h1>
  )

  if (userdata.length > 0) {
    printuserdata = userdata.map(function (elem) {
      return (
        <div
          key={elem.id}
          className="group bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-green-500/30 hover:scale-105 transition-all duration-300"
        >
          <a href={elem.url} target="_blank" rel="noreferrer">
            <div className="h-56 w-64 overflow-hidden">
              <img
                className="h-full w-full object-cover group-hover:scale-110 transition duration-500"
                src={elem.download_url}
                alt={elem.author}
              />
            </div>

            <div className="p-3">
              <h2 className="font-bold text-lg truncate text-green-400">
                {elem.author}
              </h2>

              <p className="text-sm text-gray-400">
                Click to view original
              </p>
            </div>
          </a>
        </div>
      )
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black p-6 text-white">
      
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          📸 Image Gallery
        </h1>

        <button
          onClick={getdata}
          className="bg-green-600 hover:bg-green-700 active:scale-95 transition-all text-white py-3 px-6 rounded-xl font-semibold"
        >
          {loading ? "Loading..." : "Get Images"}
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {printuserdata}
      </div>
    </div>
  )
}

export default App
