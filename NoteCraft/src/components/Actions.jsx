import React, { useEffect, useState, useContext } from 'react'
import { RiDeleteBin2Fill } from "react-icons/ri"
import Radio from "./Animation/Radio";
import { useNavigate } from 'react-router-dom';
import { ToggleTheme } from './AuthProvider';

const Actions = () => {

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { Theme } = useContext(ToggleTheme);

  const user = sessionStorage.getItem("user");

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem('myData'));
    setData(res || []);
  }, []);

  const handleDelete = (itemId) => {
    const ans = data.filter((item) => item.id !== itemId);
    localStorage.setItem('myData', JSON.stringify(ans));
    setData(ans);
  };

  if (!user) {
    return (
      <div 
        onClick={() => navigate('/login')}
        className="min-h-screen flex justify-center items-center cursor-pointer"
      >
        <Radio />
      </div>
    );
  }

 return (
  <div
    className={`min-h-screen w-full flex justify-center items-start pt-24 px-4 transition-all duration-500
    ${
      Theme === "Light"
        ? "bg-gradient-to-br from-slate-100 via-white to-sky-100"
        : ""
    }`}
  >
    <div
      className={`w-full max-w-2xl mt-10 p-6 rounded-3xl border backdrop-blur-xl flex flex-col gap-4 transition-all duration-500
      ${
        Theme === "Light"
          ? "bg-white/70 border-white/40 shadow-2xl"
          : "bg-white/10 border-white/10 shadow-2xl"
      }`}
    >
     
      <h1
        className={`text-3xl font-bold text-center mb-2 ${
          Theme === "Light" ? "text-slate-800" : "text-white"
        }`}
      >
        Manage Notes
      </h1>

     
      {data.length === 0 && (
        <div className="text-center py-10">
          <p
            className={`text-lg ${
              Theme === "Light" ? "text-slate-500" : "text-gray-300"
            }`}
          >
            No items found
          </p>
        </div>
      )}

     
      {data.map((item) => (
        <div
          key={item.id}
          className={`flex justify-between items-center px-5 py-4 rounded-2xl transition-all duration-300 hover:scale-[1.01]
          ${
            Theme === "Light"
              ? "bg-white/80 shadow-md"
              : "bg-white/10 border border-white/10"
          }`}
        >
      
          <div className="flex flex-col">
            <h2
              className={`font-semibold text-lg ${
                Theme === "Light" ? "text-slate-800" : "text-white"
              }`}
            >
              {item.subject}
            </h2>

            <p
              className={`text-sm mt-1 ${
                Theme === "Light" ? "text-slate-500" : "text-gray-300"
              }`}
            >
              {item.title}
            </p>
          </div>

    
          <button
            onClick={() => handleDelete(item.id)}
            className="p-3 rounded-xl bg-red-500 text-white hover:bg-red-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg"
          >
            <RiDeleteBin2Fill size={20} />
          </button>
        </div>
      ))}
    </div>
  </div>
);
};

export default Actions;