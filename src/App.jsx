import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [userData, setUserData] = useState([])
  const [index, setIndex] = useState(1)
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    try {
      setLoading(true)

      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${index}&limit=10`
      )

      setUserData(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [index])

  let printUserData = (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h3 className="text-xl font-semibold text-gray-400 animate-pulse">
        Loading Images...
      </h3>
    </div>
  )

  if (!loading && userData.length > 0) {
    printUserData = userData.map((elem) => {
      return (
        <div
          key={elem.id}
          className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-amber-400/20 hover:scale-105 transition-all duration-300"
        >
          <a href={elem.url} target="_blank" rel="noreferrer">
            <div className="w-64 h-56 overflow-hidden">
              <img
                src={elem.download_url}
                alt={elem.author}
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
            </div>

            <div className="p-4">
              <h2 className="font-bold text-lg text-amber-400 truncate">
                {elem.author}
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Click to view original image
              </p>
            </div>
          </a>
        </div>
      )
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white p-6">

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">
          📸 React Gallery
        </h1>

        <p className="text-gray-400">
          Explore stunning images with pagination
        </p>
      </div>

      {/* Gallery */}
      <div className="relative min-h-[75vh] flex flex-wrap justify-center gap-6">
        {printUserData}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-8 mt-6">

        <button
          disabled={index === 1}
          className="bg-amber-400 text-black px-6 py-2 rounded-xl font-semibold disabled:opacity-50 hover:bg-amber-300 active:scale-95 transition"
          onClick={() => {
            if (index > 1) {
              setUserData([])
              setIndex(index - 1)
            }
          }}
        >
          ← Prev
        </button>

        <div className="bg-zinc-800 px-5 py-2 rounded-xl">
          <h4 className="font-semibold">
            Page {index}
          </h4>
        </div>

        <button
          className="bg-amber-400 text-black px-6 py-2 rounded-xl font-semibold hover:bg-amber-300 active:scale-95 transition"
          onClick={() => {
            setUserData([])
            setIndex(index + 1)
          }}
        >
          Next →
        </button>

      </div>
    </div>
  )
}

export default App
