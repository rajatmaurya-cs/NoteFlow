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

  // 🔴 If not logged in
  if (!user) {
    return (
      <div 
        onClick={() => navigate('/login')}
        className="min-w-full min-h-screen flex justify-center items-center cursor-pointer"
      >
        <Radio />
      </div>
    );
  }

  return (
    <div className="min-w-full min-h-screen flex items-center justify-center p-6">

      {/* 🔥 Glass layer instead of solid bg */}
      <div className={`w-full max-w-2xl space-y-4 mt-20 
        ${Theme === 'Dark'
          ? 'bg-white/10 backdrop-blur-xl border border-white/10'
          : 'bg-white/80 backdrop-blur-md border border-gray-200'
        } 
        rounded-2xl p-4 shadow-lg`
      }>

        {data.length === 0 && (
          <p className={`text-center ${Theme === 'Dark' ? 'text-white/70' : 'text-gray-600'}`}>
            No items found
          </p>
        )}

        {data.map((item) => (
          <div
            key={item.id}
            className={`flex justify-between items-center border rounded-lg p-4 transition-all duration-300
              ${Theme === 'Dark'
                ? 'bg-white/10 border-white/10 text-white hover:bg-white/20'
                : 'bg-white border-gray-200 text-gray-800 hover:shadow-md'
              }`}
          >
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">{item.subject}</h1>
              <h2 className={`${Theme === 'Dark' ? 'text-white/70' : 'text-gray-600'}`}>
                {item.title}
              </h2>
            </div>

            <button
              onClick={() => handleDelete(item.id)}
              className="hover:text-red-500 transition-colors"
            >
              <RiDeleteBin2Fill size={26} />
            </button>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Actions;