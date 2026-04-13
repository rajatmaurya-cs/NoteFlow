import React, { useContext, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import Done from './Animation/Done';

import Egg from './Animation/Egg';

import { ToggleTheme } from './AuthProvider';

const LogIn = () => {

  const { Theme } = useContext(ToggleTheme)

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [done, setdone] = useState(false);


  const handlesubmit = () => {

    console.log("Entered in handlesubmit")

    if (email == '' || password == '') {
      toast.error("All Fields are required")
      return;
    }

  

    sessionStorage.setItem('user', JSON.stringify(""))

    setdone(true);

    setTimeout(() => {


      navigate('/')

    }, 3000)





  }

  if (done) return (

    <div className='min-w-full min-h-screen flex justify-center items-center'>

      <Done />

    </div>




  )
  return (

   <div
  className={`min-h-screen w-full flex justify-center items-center px-4
  ${Theme === "Light" ? "bg-[#e0e5ec]" : "bg-transparent"}`}
>
  <div
    className={`
    w-full max-w-md rounded-2xl p-8 flex flex-col justify-center transition-all duration-300
    
    ${Theme === "Light"
        ? `
      bg-[#e0e5ec]
      shadow-[10px_10px_20px_#a3b1c6,_-10px_-10px_20px_#ffffff]
    `
        : `
      bg-[#1f2937]
      shadow-[8px_8px_15px_#0b1120,_-8px_-8px_15px_#374151]
    `}
  `}
  >

 
    <div className="flex justify-center">
      <Egg />
    </div>

    
    <div className="flex flex-col gap-6 mt-10">

     
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className={`
          w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300
          
          ${Theme === "Light"
            ? `
              bg-[#e0e5ec] text-gray-700
              shadow-[inset_5px_5px_10px_#a3b1c6,_inset_-5px_-5px_10px_#ffffff]
              focus:shadow-[inset_8px_8px_15px_#a3b1c6,_inset_-8px_-8px_15px_#ffffff]
            `
            : `
              bg-[#1f2937] text-white
              shadow-[inset_4px_4px_8px_#0b1120,_inset_-4px_-4px_8px_#374151]
              focus:shadow-[inset_6px_6px_12px_#0b1120,_inset_-6px_-6px_12px_#374151]
            `}
        `}
      />

   
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className={`
          w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300
          
          ${Theme === "Light"
            ? `
              bg-[#e0e5ec] text-gray-700
              shadow-[inset_5px_5px_10px_#a3b1c6,_inset_-5px_-5px_10px_#ffffff]
              focus:shadow-[inset_8px_8px_15px_#a3b1c6,_inset_-8px_-8px_15px_#ffffff]
            `
            : `
              bg-[#1f2937] text-white
              shadow-[inset_4px_4px_8px_#0b1120,_inset_-4px_-4px_8px_#374151]
              focus:shadow-[inset_6px_6px_12px_#0b1120,_inset_-6px_-6px_12px_#374151]
            `}
        `}
      />

  
      <button
        onClick={handlesubmit}
        className={`
          w-full py-3 rounded-xl transition-all duration-200 font-medium
          
          ${Theme === "Light"
            ? `
              bg-[#e0e5ec] text-gray-700
              shadow-[6px_6px_12px_#a3b1c6,_-6px_-6px_12px_#ffffff]
              active:shadow-[inset_4px_4px_8px_#a3b1c6,_inset_-4px_-4px_8px_#ffffff]
              hover:bg-blue-500
            `
            : `
              bg-[#1f2937] text-white
              shadow-[5px_5px_10px_#0b1120,_-5px_-5px_10px_#374151]
              active:shadow-[inset_4px_4px_8px_#0b1120,_inset_-4px_-4px_8px_#374151]
              hover:bg-indigo-900
            `}
        `}
      >
        Sign In
      </button>

    </div>
  </div>
</div>
  )
}

export default LogIn
