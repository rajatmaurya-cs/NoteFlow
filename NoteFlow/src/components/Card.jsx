import React from 'react'
import { useParams } from 'react-router-dom'

const Card = () => {

    const {Id} = useParams();

    const data = JSON.parse(localStorage.getItem('myData'));
    console.log(data)

    const res = data.filter((item)=> item.id == Id)

return (
  <div className="w-full">
    {res.map((item) => {
      return (
        <div
          key={item.id}
          className="w-full h-screen flex flex-col justify-center items-center 
          bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 
          text-gray-900 px-6"
        >
        
          <h1 className="text-2xl md:text-3xl uppercase tracking-widest  mb-4 text-green-500">
            {item.subject}
          </h1>


          <h2 className="text-5xl md:text-7xl font-extrabold text-center leading-tight mb-8 text-gray-900">
            {item.title}
          </h2>

     
          <div className="max-w-3xl p-6 text-center text-lg md:text-xl 
          text-gray-700 leading-relaxed 
          border border-gray-400 rounded-2xl 
          bg-white shadow-xl">
            {item.description}
          </div>
        </div>
      );
    })}
  </div>
);
}

export default Card
