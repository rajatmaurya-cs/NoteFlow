import React, { useState, useContext } from 'react';
import { MdEditSquare } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { Report } from 'notiflix';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { LuMoveUpRight } from "react-icons/lu";
import Radio from './Animation/Radio';
import Wall from './Animation/Pattern';
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
    const newData = container.filter((item) => item.id !== itemId);
    setContainer(newData);
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
    const res = container.filter((item) => item.id !== itemId);
    setContainer(res);
  };

  // 🔒 Login check
  if (!user) {
    return (
      <div
        onClick={() => navigate('/login')}
        className="min-w-full min-h-screen flex justify-center items-center"
      >
        <Radio />
      </div>
    );
  }

  return (
    <div className={Theme === 'Light'?"bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200":"w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-transparent"}>


      <div className="flex flex-col min-h-screen w-full justify-start items-center p-10 mt-20 relative z-10">

        {/* Heading */}
        <h1 className="text-blue-600 text-5xl text-center">
          Manage
          <span className='animate-pulse text-green-500'> Your </span>
          Tasks Easily
        </h1>

        <h1 className="text-blue-600 text-5xl mb-6 text-center">
          Create Edit <span className='text-green-500 animate-pulse'> & </span> Organize
        </h1>

        {/* Input */}
        <div className="flex items-center justify-center space-x-4 mb-8 w-full max-w-2xl">
          <input
            type="text"
            placeholder="Enter Task"
            value={work}
            onChange={(e) => setWork(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-100 dark:border-gray-700 bg-white/80 dark:bg-gray-900/50 backdrop-blur-md focus:outline-none"
          />

          <button
            onClick={handleSubmit}
            className="text-green-500 hover:text-blue-600 transition"
          >
            <IoIosSave size={40} />
          </button>
        </div>

        {/* Task Container */}
        <div className="w-full max-w-3xl bg-white/80 dark:bg-gray-900/50 backdrop-blur-md p-6 rounded-3xl shadow-md flex flex-col space-y-4 border border-gray-200 dark:border-gray-700">

          {container.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/40 p-4 rounded-2xl transition"
            >
              <h2 className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
                {item.task}
              </h2>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <MdEditSquare size={30} />
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-black dark:text-gray-300 hover:text-red-600"
                >
                  <RiDeleteBin2Fill size={30} />
                </button>
              </div>
            </div>
          ))}

        </div>

        {/* Button */}
        <button
          onClick={() => navigate('/notepad')}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600"
        >
          Go to Editor <LuMoveUpRight size={24} />
        </button>

      </div>

    </div>
  );
};

export default Diary;