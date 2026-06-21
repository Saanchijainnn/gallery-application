import React from 'react'
import axios from 'axios'

const App = () => {

const getdata=async()=>{
  console.log("data")
  const response = await axios.get("https://picsum.photos/v2/list?page=2&limit=100")

  console.log(response)
  }

  return (
    <div className="bg-black h-screen p-4 text-white">
      <button 
      onClick={getdata }
      className="bg-green-600 mb-3 active:scale-95text-white  py-2 px-5 rounded">
        Get data
      </button>
    </div>
  )
}

export default App
