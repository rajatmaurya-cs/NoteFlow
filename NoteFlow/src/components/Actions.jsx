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
      className={`min-h-screen w-full flex justify-center items-start pt-20 px-4
      ${Theme === "Light" ? "bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200" : ""}`}
    >

     
      <div
        className={`
          w-full max-w-2xl p-6 rounded-2xl flex flex-col gap-4 mt-10
          
          ${Theme === "Light"
            ? "bg-[#e0e5ec] shadow-[10px_10px_20px_#a3b1c6,_-10px_-10px_20px_#ffffff]"
            : " "
          }
        `}
      >

    
        {data.length === 0 && (
          <p className="text-center opacity-70">
            No items found
          </p>
        )}

       
        {data.map((item) => (
          <div
            key={item.id}
            className={`
              flex justify-between items-center px-4 py-3 rounded-xl transition-all
              
              ${Theme === "Light"
                ? "bg-[#e0e5ec] shadow-[6px_6px_12px_#a3b1c6,_-6px_-6px_12px_#ffffff]"
                : "bg-[#1f2937] shadow-[5px_5px_10px_#0b1120,_-5px_-5px_10px_#374151]"
              }
            `}
          >

       
            <div className="flex flex-col">
              <h1 className={Theme === 'Light'?"font-semibold":"font-semibold text-white"}>{item.subject}</h1>
              <h2 className={Theme === 'Light'?"opacity-70 text-sm":"text-white opacity-70 text-sm"}>{item.title}</h2>
            </div>

           
            <button
              onClick={() => handleDelete(item.id)}
              className={`
                p-2 rounded-lg transition-all
                
                ${Theme === "Light"
                  ? "bg-[#e0e5ec] shadow-[4px_4px_8px_#a3b1c6,_-4px_-4px_8px_#ffffff] active:shadow-[inset_3px_3px_6px_#a3b1c6,_inset_-3px_-3px_6px_#ffffff] hover:bg-red-500"
                  : "bg-[#1f2937] shadow-[4px_4px_8px_#0b1120,_-4px_-4px_8px_#374151] active:shadow-[inset_3px_3px_6px_#0b1120,_inset_-3px_-3px_6px_#374151] text-white hover:bg-red-500"
                }
              `}
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