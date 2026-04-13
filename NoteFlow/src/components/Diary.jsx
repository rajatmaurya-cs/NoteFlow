import React, { useState, useContext } from 'react';
import { MdEditSquare } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { Report } from 'notiflix';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { LuMoveUpRight } from "react-icons/lu";
import Radio from './Animation/Radio';
import { ToggleTheme } from './AuthProvider';

const Diary = () => {

  const user = sessionStorage.getItem("user");
  const { Theme } = useContext(ToggleTheme);
  const navigate = useNavigate();

  const [container, setContainer] = useState([
    { id: 1, task: "Learn React" },
    { id: 2, task: "Laws of Motion" },
    { id: 3, task: "HTML" }
  ]);

  const [work, setWork] = useState('');

  const handleEdit = (itemId) => {
    const res = container.find((itr) => itr.id === itemId);
    setWork(res.task);
    setContainer(container.filter((item) => item.id !== itemId));
  };

  const handleSubmit = () => {
    if (!work.trim()) return;

    const newTask = {
      id: uuidv4(),
      task: work,
    };

    setContainer([...container, newTask]);
    Report.success('Task Added Successfully');
    setWork('');
  };

  const handleDelete = (itemId) => {
    setContainer(container.filter((item) => item.id !== itemId));
  };

  if (!user) {
    return (
      <div
        onClick={() => navigate('/login')}
        className="min-h-screen flex justify-center items-center"
      >
        <Radio />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full flex justify-center items-start pt-20
      ${Theme === "Light" ? "bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200" : "bg-transparent"}`}
    >

      <div className="w-full max-w-3xl flex flex-col items-center mt-20">

        {/* Heading */}
        <h1 className={Theme === 'Light' ? "text-4xl font-semibold mb-8 text-center text-black" : "text-4xl font-semibold mb-8 text-center text-white"}>
          Manage Your Task
        </h1>

        {/* Input Section */}
        <div
          className={`flex items-center gap-4 p-4 rounded-2xl w-full mb-8
          ${Theme === "Light"
              ? "bg-[#e0e5ec] shadow-[8px_8px_15px_#a3b1c6,_-8px_-8px_15px_#ffffff]"
              : "bg-[#1f2937] shadow-[6px_6px_12px_#0b1120,_-6px_-6px_12px_#374151]"
            }`}
        >

          <input
            type="text"
            placeholder="Enter Task"
            value={work}
            onChange={(e) => setWork(e.target.value)}
            className={`
              flex-1 px-4 py-2 rounded-xl focus:outline-none transition-all
              
              ${Theme === "Light"
                ? `
                  bg-[#e0e5ec]
                  shadow-[inset_4px_4px_8px_#a3b1c6,_inset_-4px_-4px_8px_#ffffff]
                `
                : `
                  bg-[#1f2937]
                  shadow-[inset_4px_4px_8px_#0b1120,_inset_-4px_-4px_8px_#374151] text-white
                `}
            `}
          />

          <button
            onClick={handleSubmit}
            className={`
              p-3 rounded-xl transition-all
              
              ${Theme === "Light"
                ? `
                  bg-[#e0e5ec]
                  shadow-[5px_5px_10px_#a3b1c6,_-5px_-5px_10px_#ffffff]
                  active:shadow-[inset_4px_4px_8px_#a3b1c6,_inset_-4px_-4px_8px_#ffffff]
                `
                : `
                  bg-[#1f2937]
                  shadow-[5px_5px_10px_#0b1120,_-5px_-5px_10px_#374151]
                  active:shadow-[inset_4px_4px_8px_#0b1120,_inset_-4px_-4px_8px_#374151] text-white
                `}
            `}
          >
            <IoIosSave size={26} />
          </button>

        </div>

        {/* Task List Container */}
        <div
          className={`
            w-full p-6 rounded-2xl flex flex-col gap-4
            
            ${Theme === "Light"
              ? "bg-[#e0e5ec] shadow-[10px_10px_20px_#a3b1c6,_-10px_-10px_20px_#ffffff]"
              : "bg-[#1f2937] shadow-[8px_8px_15px_#0b1120,_-8px_-8px_15px_#374151]"
            }
          `}
        >

          {container.map((item) => (
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

              <h2 className={Theme === 'Light' ? "text-black" : "text-white"}>{item.task}</h2>

              <div className="flex gap-3">

                <button
                  onClick={() => handleEdit(item.id)}
                  className={
                    Theme === "Light"
                      ? "p-2 rounded-lg transition-all active:scale-90 text-black hover:bg-green-500"
                      : "p-2 rounded-lg transition-all active:scale-90 text-white hover:bg-green-500"
                  }
                >
                  <MdEditSquare size={22} />
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className={Theme === 'Light' ? "p-2 rounded-lg transition-all active:scale-90 hover:bg-red-500" : "p-2 rounded-lg transition-all active:scale-90 text-white hover:bg-red-500"}
                >
                  <RiDeleteBin2Fill size={22} />
                </button>

              </div>
            </div>
          ))}

        </div>

        {/* Navigation Button */}
        <button
          onClick={() => navigate('/notepad')}
          className={`
            mt-6 px-6 py-3 rounded-xl flex items-center gap-2 transition-all
            
            ${Theme === "Light"
              ? "bg-[#e0e5ec] shadow-[6px_6px_12px_#a3b1c6,_-6px_-6px_12px_#ffffff]"
              : "bg-[#1f2937] shadow-[5px_5px_10px_#0b1120,_-5px_-5px_10px_#374151] text-white"
            }
          `}
        >
          Go to Editor <LuMoveUpRight size={20} />
        </button>

      </div>
    </div>
  );
};

export default Diary;