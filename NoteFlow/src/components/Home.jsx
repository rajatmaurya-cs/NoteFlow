
import React, { useState } from 'react';

import { Link } from 'react-router-dom';


export const subjects = [
  'All',
  'Chemistry',
  'Physics',
  'Math',
  'Bio',
  'English',
  'Hindi',
  'Computer Science',
  'Others',
];

const Home = ({ data }) => {

  const [search, setSearch] = useState('All');


  const filteredData = data?.filter(
    (item) =>
      search === 'All' ||
      item.subject.toLowerCase() === search.toLowerCase()
  );

  return (


    <div className="min-h-full  bg-gray-100 mt-20">
    
      <div className="z-10  backdrop-blur-md border-b border-gray-100 shadow-sm flex justify-center">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
         
          
       
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {subjects.map((item) => {
              const isActive = search === item;
              return (
                <button
                  key={item}
                  onClick={() => setSearch(item)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out border
                    ${
                      isActive
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-105'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50'
                    }
                  `}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {filteredData && filteredData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.map((item) => (
              <Link
                to={`/Card/${item.id}`}
                key={item.id}
                className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
         
                <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="p-6">
               
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {item.subject}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      {item.date}
                    </span>
                  </div>

           
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>

            
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
                    {item.description}
                  </p>

            
                  <div className="flex items-center text-indigo-600 text-sm font-semibold mt-auto">
                    Read Note
                    <svg 
                      className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
     
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No notes found</h3>
            <p className="text-gray-500 mt-1">Try selecting a different subject.</p>
          </div>
        )}
      </div>
    </div>

  );
};

export default Home;