import React, { useContext, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import Done from './Animation/Done';

import Egg from './Animation/Egg';

import  {ToggleTheme}  from './AuthProvider';

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

    // setUser(true);

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

  <div className="min-h-screen min-w-full flex justify-center items-center px-4">

  <div className={`w-full max-w-md rounded-2xl shadow-md p-8 flex flex-col justify-center
    ${Theme === "Light"
      ? "bg-blue-200 border border-blue-100"
      : "bg-white/10 backdrop-blur-xl border border-white/10 text-white"
    }`}>

    <div className='flex justify-center'>
      <Egg />
    </div>

    <div className="flex flex-col gap-5 mt-10">

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className={`w-full p-3 rounded-lg border-2 focus:outline-none
          ${Theme === "Light"
            ? "border-green-500 border-4"
            : "border-white/30 bg-white/10 text-white"
          }`}
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className={`w-full p-3 rounded-lg border-2 focus:outline-none
          ${Theme === "Light"
            ? "border-yellow-400 border-4"
            : "border-white/30 bg-white/10 text-white"
          }`}
      />

      <button
        onClick={handlesubmit}
        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
      >
        Sign In
      </button>

    </div>

  </div>
</div>
  )
}

export default LogIn
