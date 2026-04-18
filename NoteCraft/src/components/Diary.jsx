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
import toast from 'react-hot-toast';

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
    if (!work.trim()){ 
      toast.error("Please Enter a Task");
       return;}

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
    className={`min-h-screen w-full flex justify-center items-start pt-24 px-4 transition-all duration-500
    ${
      Theme === "Light"
        ? "bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200"
        : ""
    }`}
  >
    <div className="w-full max-w-3xl flex flex-col items-center">

      
      <h1
        className={`text-4xl md:text-5xl font-bold mb-10 text-center ${
          Theme === "Light" ? "text-slate-800" : "text-white"
        }`}
      >
        Manage Your Tasks
      </h1>

   
      <div
        className={`w-full flex items-center gap-4 p-4 rounded-3xl border backdrop-blur-xl mb-8 transition-all
        ${
          Theme === "Light"
            ? "bg-white/70 border-white/40 shadow-2xl"
            : "bg-white/10 border-white/10 shadow-2xl"
        }`}
      >
        <input
          type="text"
          placeholder="Enter your task..."
          value={work}
          onChange={(e) => setWork(e.target.value)}
          className={`flex-1 px-5 py-4 rounded-2xl outline-none text-lg transition-all
          ${
            Theme === "Light"
              ? "bg-white/80 text-slate-700 placeholder:text-slate-400 border border-white shadow-md focus:ring-2 focus:ring-indigo-400"
              : "bg-white/10 text-white placeholder:text-gray-300 border border-white/10 focus:ring-2 focus:ring-indigo-400"
          }`}
        />

        <button
          onClick={handleSubmit}
          className={`p-4 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95
          ${
            Theme === "Light"
              ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl"
              : "bg-indigo-500 text-white hover:bg-indigo-600 shadow-xl"
          }`}
        >
          <IoIosSave size={24} />
        </button>
      </div>

   
      <div
        className={`w-full p-5 rounded-3xl border backdrop-blur-xl flex flex-col gap-4 transition-all
        ${
          Theme === "Light"
            ? "bg-white/70 border-white/40 shadow-2xl"
            : "bg-white/10 border-white/10 shadow-2xl"
        }`}
      >
        {container.map((item) => (
          <div
            key={item.id}
            className={`flex justify-between items-center px-5 py-4 rounded-2xl transition-all hover:scale-[1.01]
            ${
              Theme === "Light"
                ? "bg-white/80 shadow-md"
                : "bg-white/10 border border-white/10"
            }`}
          >
            <h2
              className={`text-lg font-medium ${
                Theme === "Light" ? "text-slate-800" : "text-white"
              }`}
            >
              {item.task}
            </h2>

            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(item.id)}
                className="p-3 rounded-xl bg-green-500 text-white hover:scale-105 active:scale-95 transition-all"
              >
                <MdEditSquare size={20} />
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="p-3 rounded-xl bg-red-500 text-white hover:scale-105 active:scale-95 transition-all"
              >
                <RiDeleteBin2Fill size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      
      <button
        onClick={() => navigate("/notepad")}
        className={`mt-8 px-6 py-4 rounded-2xl flex items-center gap-2 font-semibold transition-all duration-300 hover:scale-105 active:scale-95
        ${
          Theme === "Light"
            ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl"
            : "bg-indigo-500 text-white hover:bg-indigo-600 shadow-xl"
        }`}
      >
        Go to Editor <LuMoveUpRight size={20} />
      </button>

    </div>
  </div>
);
};

export default Diary;