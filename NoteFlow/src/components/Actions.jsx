import React, { useEffect, useState , useContext } from 'react'
import { RiDeleteBin2Fill } from "react-icons/ri"
import { LoggedInContext } from "./AuthProvider";
import Radio from "./Animation/Radio";
import { Navigate, useNavigate } from 'react-router-dom';
const Actions = () => {

  const navigate = useNavigate();

  const [data, setData] = useState([]);

  // const { user } = useContext(LoggedInContext)
  const user = sessionStorage.getItem("user");

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem('myData'));
    setData(res || []);
  }, []);

  const handleDelete = (itemId) => {
    const ans = data.filter((item) => item.id !== itemId);
    localStorage.setItem('myData',JSON.stringify(ans))
    setData(ans);
    
  };


    if (!user) return (

        <div onClick={()=> navigate('/login')}
        className="min-w-full min-h-screen flex justify-center items-center">

            <Radio/>

        </div>
    )

  return (
    <div className="min-w-full min-h-screen flex items-center justify-center bg-gray-100 p-6">

      <div className="w-full max-w-2xl space-y-4 mt-10">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border rounded-lg bg-white shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-gray-800">{item.subject}</h1>
              <h2 className="text-sm text-gray-600">{item.title}</h2>
            </div>
            <button
                   onClick={()=>handleDelete(item.id)}
                     className="text-black hover:text-red-700 hover:animate-pulse transition-colors"
                   >
                     <RiDeleteBin2Fill size={30} />
                   </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Actions;
