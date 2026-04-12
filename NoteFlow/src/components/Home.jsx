import React, { useContext, useState } from 'react';
import { ToggleTheme } from './AuthProvider';
import { Link } from 'react-router-dom';

export const subjects = [
  'All', 'Chemistry', 'Physics', 'Math', 'Bio',
  'English', 'Hindi', 'Computer Science', 'Others',
];

const Home = ({ data }) => {

  const [search, setSearch] = useState('All');
  const { Theme } = useContext(ToggleTheme);

  const isLight = Theme === "Light";

  const filteredData = data?.filter(
    (item) =>
      search === 'All' ||
      item.subject.toLowerCase() === search.toLowerCase()
  );

  return (


    <div className="min-h-screen">


      <div className="w-full flex justify-center mt-40">
        <div className="flex flex-wrap gap-2 justify-center">
          {subjects.map((item) => {
            const isActive = search === item;
            return (
              <button
                key={item}
                onClick={() => setSearch(item)}
                className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border
            ${isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 scale-105'
                    : isLight
                      ? 'bg-gray-200 text-gray-600 border-gray-200 hover:text-indigo-600'
                      : 'bg-white/10 text-white border-white/10 hover:bg-white/20'
                  }
          `}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

        {filteredData && filteredData.length > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredData.map((item) => (
              <Link
                to={`/Card/${item.id}`}
                key={item.id}
                className={`group block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1
                  ${isLight
                    ? "bg-white border border-gray-100 shadow-sm hover:shadow-xl"
                    : "bg-white/10 backdrop-blur-xl border border-white/10 text-white hover:bg-white/20"
                  }`}
              >


                <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="p-6">

                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-medium
                      ${isLight
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                        : "bg-indigo-500/20 text-indigo-300 border border-indigo-400/20"
                      }`}
                    >
                      {item.subject}
                    </span>

                    <span className={`text-xs ${isLight ? "text-gray-400" : "text-white/60"}`}>
                      {item.date}
                    </span>
                  </div>

                  <h3 className={`text-xl font-bold mb-2 transition-colors
                    ${isLight ? "text-gray-900" : "text-white"}`}>
                    {item.title}
                  </h3>



                  <div className="flex items-center text-indigo-500 text-sm font-semibold">
                    Read Note →
                  </div>

                </div>
              </Link>
            ))}

          </div>

        ) : (

          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className={`${isLight ? "bg-gray-100" : "bg-white/10"} p-4 rounded-full mb-4`}>
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth={2} d="M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0" />
              </svg>
            </div>
            <h3 className={`${isLight ? "text-gray-900" : "text-white"} text-lg`}>
              No notes found
            </h3>
          </div>

        )}

      </div>
    </div>
  );
};

export default Home;