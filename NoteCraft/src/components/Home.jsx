import React, { useContext, useEffect, useState } from "react";
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
      localStorage.setItem("myData", JSON.stringify(Notes));
    }
  }, []);

  const isLight = Theme === "Light";

  const filteredData = Data?.filter(
    (item) =>
      search === "All" ||
      item.subject.toLowerCase() === search.toLowerCase()
  );

  return (
    <div
      className={
        isLight
          ? "min-h-screen bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200 text-gray-800"
          : "min-h-screen text-gray-100"
      }
    >

      {/* 🔘 FILTER BAR */}
      <div className="w-full flex justify-center mt-40">
        <div
          className={
            isLight
              ? "flex flex-wrap gap-3 justify-center p-4 rounded-2xl bg-white shadow-[inset_2px_2px_6px_rgba(0,0,0,0.08),_inset_-2px_-2px_6px_rgba(255,255,255,0.9)]"
              : "flex flex-wrap gap-3 justify-center p-4 rounded-2xl bg-[#1f2026] shadow-[inset_3px_3px_10px_rgba(0,0,0,0.6),_inset_-3px_-3px_10px_rgba(255,255,255,0.05)]"
          }
        >
          {subjects.map((item) => {
            const isActive = search === item;

            return (
              <button
                key={item}
                onClick={() => setSearch(item)}
                className={`
                  px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200
                  ${
                    isLight
                      ? isActive
                        ? "bg-indigo-950 text-gray-900 shadow-[inset_3px_3px_8px_rgba(0,0,0,0.12),_inset_-3px_-3px_8px_rgba(255,255,255,1)] scale-[1.03] text-white"
                        : "bg-[#f5f6f8] shadow-[3px_3px_8px_rgba(0,0,0,0.12),_-3px_-3px_8px_rgba(255,255,255,1)] hover:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1)]"
                      : isActive
                        ? "bg-gray-200 text-black shadow-[inset_3px_3px_8px_rgba(0,0,0,0.7),_inset_-3px_-3px_8px_rgba(255,255,255,0.05)] scale-[1.03]"
                        : "bg-[#1f2026] text-gray-300 shadow-[4px_4px_10px_rgba(0,0,0,0.6),_-3px_-3px_8px_rgba(255,255,255,0.05)] hover:text-white"
                  }
                `}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* 📚 CARDS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">

        {filteredData && filteredData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredData.map((item) => (
              <Link
                to={`/Card/${item.id}`}
                key={item.id}
                className={
                  isLight
                    ? "block rounded-2xl bg-white p-6 shadow-[8px_8px_20px_rgba(0,0,0,0.12),_-6px_-6px_16px_rgba(255,255,255,1)] hover:shadow-[inset_4px_4px_12px_rgba(0,0,0,0.08),_inset_-4px_-4px_12px_rgba(255,255,255,1)] transition-all duration-300 hover:scale-[1.02]"
                    : "block rounded-2xl bg-[#1f2026] p-6 shadow-[8px_8px_20px_rgba(0,0,0,0.7),_-3px_-3px_10px_rgba(255,255,255,0.05)] hover:shadow-[inset_5px_5px_12px_rgba(0,0,0,0.8),_inset_-3px_-3px_10px_rgba(255,255,255,0.05)] transition-all duration-300 hover:scale-[1.02]"
                }
              >

            
                <div className="flex justify-between items-center mb-4">
                  <span
                    className={
                      isLight
                        ? "px-3 py-1 text-xs font-semibold rounded-lg bg-[#f0f2f5] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.08),_-2px_-2px_5px_rgba(255,255,255,1)]"
                        : "px-3 py-1 text-xs font-semibold rounded-lg bg-[#2a2c35] text-gray-200 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.6),_-2px_-2px_6px_rgba(255,255,255,0.05)]"
                    }
                  >
                    {item.subject}
                  </span>

                  <span className="text-xs text-gray-400">
                    {item.date}
                  </span>
                </div>

         
                <h3 className="text-xl font-bold mb-3">
                  {item.title}
                </h3>

            
                <div
                  className={
                    isLight
                      ? "mt-6 inline-flex items-center px-4 py-2 rounded-xl font-semibold text-indigo-600 bg-white shadow-[4px_4px_10px_rgba(0,0,0,0.12),_-3px_-3px_8px_rgba(255,255,255,1)] hover:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.1)] transition-all"
                      : "mt-6 inline-flex items-center px-4 py-2 rounded-xl font-semibold text-indigo-300 bg-[#1f2026] shadow-[4px_4px_12px_rgba(0,0,0,0.7),_-3px_-3px_8px_rgba(255,255,255,0.05)] hover:shadow-[inset_3px_3px_10px_rgba(0,0,0,0.8)] transition-all"
                  }
                >
                  Read Note →
                </div>

              </Link>
            ))}

          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h3 className="text-lg font-semibold text-gray-400">
              No notes found
            </h3>
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;