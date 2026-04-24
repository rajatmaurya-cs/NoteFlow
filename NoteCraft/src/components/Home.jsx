import React, { useContext, useEffect, useMemo, useState } from "react";
import { ToggleTheme } from "./AuthProvider";
import { Link } from "react-router-dom";
import { Notes } from "./mockData";

export const subjects = [
  "All", "Chemistry", "Physics", "Math", "Bio",
  "English", "Hindi", "Computer Science", "Others",
];

const Home = () => {
  const [search, setSearch] = useState("All");

  const { Theme } = useContext(ToggleTheme);

  const [Data, setData] = useState([]);

  useEffect(() => {

    const savedData = JSON.parse(localStorage.getItem("myData"));

    if (savedData) {

      setData(savedData);

    } else {

      setData(Notes);

      console.log("The data is: ", Data)

      localStorage.setItem("myData", JSON.stringify(Notes));

    }
  }, []);

  const isLight = Theme === "Light";



  const filteredData = useMemo(() => {

    if (search === "All") return Data;

    return Data.filter((item) =>
      item.subject.toLowerCase() === search.toLowerCase()
    );
  }, [Data, search]);

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${isLight
        ? "bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200"
        : " text-white"
        }`}
    >

      <div className="w-full flex justify-center pt-36 px-4">
        <div
          className={`flex flex-wrap gap-3 justify-center p-4 rounded-3xl border backdrop-blur-xl transition-all duration-500
        ${isLight
              ? "bg-white/70 border-white/40 shadow-2xl"
              : "bg-white/10 border-white/10 shadow-2xl"
            }`}
        >
          {subjects.map((item) => {

            const isActive = search === item;

            return (
              <button
                key={item}
                onClick={() => setSearch(item)}
                className={`px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 hover:scale-105
              ${isActive
                    ? isLight
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "bg-indigo-500 text-white shadow-lg"
                    : isLight
                      ? "bg-white/80 text-slate-700 hover:bg-white shadow-md"
                      : "bg-white/10 text-gray-200 hover:bg-white/20 border border-white/10"
                  }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pb-12">
        {filteredData && filteredData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.map((item) => (
              <Link
                key={item.id}
                to={`/Card/${item.id}`}
                className={`rounded-3xl p-6 border backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1
              ${isLight
                    ? "bg-white/70 border-white/40 shadow-2xl"
                    : "bg-white/10 border-white/10 shadow-2xl"
                  }`}
              >
                {/* Top Row */}
                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-xl font-semibold
                  ${isLight
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "bg-white/10 text-indigo-300 border border-white/10"
                      }`}
                  >
                    {item.subject}
                  </span>

                  <span
                    className={`text-xs ${isLight ? "text-slate-500" : "text-gray-300"
                      }`}
                  >
                    {item.date}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold mb-4 line-clamp-2">
                  {item.title}
                </h2>

                {/* Button */}
                <div
                  className={`mt-4 inline-block px-4 py-2 rounded-2xl font-semibold transition-all duration-300
                ${isLight
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg"
                      : "bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg"
                    }`}
                >
                  Read Note →
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <h3
              className={`text-xl font-semibold ${isLight ? "text-slate-500" : "text-gray-300"
                }`}
            >
              No Notes Found
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;