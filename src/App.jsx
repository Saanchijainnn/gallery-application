import React, { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [userdata, setUserData] = useState([])

  const getdata = async () => {
    const response = await axios.get("https://picsum.photos/v2/list?page=2&limit=30")
    setUserData(response.data)
  }

  let printuserdata = "No user available"

  if (userdata.length > 0) {
    printuserdata = userdata.map(function(elem, idx) {
      return <div key={idx}>
        <div className="h-40 w-44 overflow-hidden rounded-xl bg-white ">
        <img className="h-full w-full object-cover"   src={elem.download_url} alt=""></img>
      </div>
      <h2 className="font-bold text-lg">{elem.author}</h2>
      </div> // each item from the API
    })
  }

  return (
    <div className="bg-black overflow-auto h-screen p-4 text-white">
      <button
        onClick={getdata}
        className="bg-green-600 mb-3 active:scale-95 text-white py-2 px-5 rounded">
        Get data
      </button>
      <div className="flex flex-wrap gap-4">{printuserdata}</div>
    </div>
  )
}

export default App