import React from 'react';
import { Link } from 'react-router-dom';
const Home = ({ data }) => {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data?.length > 0 ? (
        data.map((item) => (
          <Link to = {`/Card/${item.id}`}
            key={item.id}
            className="bg-white shadow-lg rounded-xl p-4 hover:shadow-2xl transition-shadow duration-300"
          >
           
            <div className="text-sm font-medium text-indigo-600 mb-1">
              {item.subject}
            </div>

     
            <div className="text-lg font-semibold text-gray-800 mb-2">
              {item.title}
            </div>

         
            <div className="text-sm text-gray-600 mb-3 line-clamp-3">
              {item.description}
            </div>

        
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{item.date}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-white text-[10px] ${
                  item.published ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {item.published ? 'Published' : 'Draft'}
              </span>
            </div>
          </Link>
        ))
      ) : (
        <div>No notes available</div>
      )}
    </div>
  );
};

export default Home;