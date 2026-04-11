import React, { useState, useContext } from 'react'
import { MdEditSquare } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { Report } from 'notiflix';
import { v4 as uuidv4 } from 'uuid';
import {useNavigate} from 'react-router-dom'
import { LuMoveUpRight } from "react-icons/lu";
import Radio from './Animation/Radio';
import { LoggedInContext } from "./AuthProvider";



const Diary = () => {

  const user = sessionStorage.getItem("user");

  // const { user } = useContext(LoggedInContext)
  const navigate = useNavigate();


  const [container, setcontainer] = useState([{ id: 1, task: "Larn React" }, { id: 2, task: "Laws of Motion" }, { id: 3, task: "HTML" }]);

  const [work, setwork] = useState('')

  



  const handleEdit = (itemId) => {
    const res = container.filter((itr) => itr.id === itemId);
    setwork(res[0].task);
    const newData = container.filter((item) => itemId != item.id);
    setcontainer(newData)
}

  const handlesubmit = () => {
    const newTask = {
      id: uuidv4(),
      task: work,
    }

    setcontainer([...container, newTask])

    Report.success(
      'Task Added Successfully',
    );

    setwork('')

  }
  
  const handledelete = (itemId)=>{

      const res = container.filter((item)=>item.id!=itemId);

      setcontainer(res);

  }

    if (!user) return (

        <div onClick={()=> navigate('/login')}
        className="min-w-full min-h-screen flex justify-center items-center">

            <Radio/>

        </div>
    )
 

  return (

    < div className='w-full min-h-screen flex items-center justify-center bg-gray-100 '>

  <div className="flex flex-col min-h-screen w-full bg-gray-100 justify-start items-center p-10 mt-20">

      {/* Main Heading */}
      <h1 className="text-blue-600 text-5xl">
        Manage 
        <span className='animate-pulse text-green-500'> Your </span>
        Tasks Easily
      </h1>

      <h1 className="text-blue-600 text-5xl  mb-5"> Create Edit   <span className='text-green-500 animate-pulse'> & </span> Organize</h1>

      {/* Input + Save Button */}
      <div className="flex items-center justify-center space-x-4 mb-8 w-full max-w-2xl">
        <input
          type="text"
          placeholder="Enter Task"
          value={work}
          onChange={(e) => setwork(e.target.value)}
          className="w-full p-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
        />
        <button
          onClick={() => handlesubmit()}
          className="text-green-500 hover:text-blue-600 hover:animate-pulse transition-colors"
        >
          <IoIosSave size={40} />
        </button>
      </div>

     {/* Task Container */}
<div className="w-full max-w-3xl bg-white p-6 rounded-3xl shadow-lg flex flex-col space-y-4">
  {container.map((item) => (
    <div
      key={item.id}
      className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl shadow hover:shadow-lg transition-shadow duration-200"
    >
      <h2 className="text-gray-800 font-semibold text-lg">{item.task}</h2>

      <div className="flex space-x-4">
        <button
          onClick={() => handleEdit(item.id)}
          className="text-blue-500 hover:text-blue-700 transition-colors"
        >
          <MdEditSquare size={30} />
        </button>

        <button
        onClick={()=>handledelete(item.id)}
          className="text-black hover:text-red-700 hover:animate-pulse transition-colors"
        >
          <RiDeleteBin2Fill size={30} />
        </button>
      </div>
    </div>
  ))}

  
</div> 





  <button onClick={()=>navigate('/notepad')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600">
    Go to Editor <span><LuMoveUpRight size ={30} /></span>
  </button>


    </div>

     

    </div>

  );
}

export default Diary
