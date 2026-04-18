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
  console.log("Entered in handlesubmit");

  if (email === "" || password === "") {
    toast.error("All Fields are required");
    return;
  }


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    toast.error("Enter a valid email");
    return;
  }


  if (password.length <= 6) {
    toast.error("Password must be greater than 6 characters");
    return;
  }

  sessionStorage.setItem("user", JSON.stringify(email));

  setdone(true);

  setTimeout(() => {
    navigate("/");
  }, 3000);
};

  if (done) return (

    <div className='min-w-full min-h-screen flex justify-center items-center'>

      <Done />

    </div>




  )
 return (
  <div
    className={`min-h-screen w-full flex justify-center items-center px-4 transition-all duration-500
    ${
      Theme === "Light"
        ? "bg-gradient-to-br from-slate-100 via-white to-sky-100"
        : "bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b]"
    }`}
  >
    <div
      className={`w-full max-w-md rounded-3xl p-8 border backdrop-blur-2xl transition-all duration-500 mt-15
      ${
        Theme === "Light"
          ? "bg-white/70 border-white/50 shadow-2xl"
          : "bg-white/10 border-white/10 shadow-2xl"
      }`}
    >
   
      <div className="flex justify-center mb-4">
        <Egg />
      </div>

    
      <div className="text-center mb-8">
        <h1
          className={`text-3xl font-bold ${
            Theme === "Light" ? "text-slate-800" : "text-white"
          }`}
        >
          Welcome Back
        </h1>

        <p
          className={`mt-2 text-sm ${
            Theme === "Light" ? "text-slate-500" : "text-gray-300"
          }`}
        >
          Sign in to continue to Notecraft
        </p>
      </div>

   
      <div className="flex flex-col gap-5">
        {/* Email */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          className={`w-full px-5 py-4 rounded-2xl outline-none text-lg transition-all duration-300
          ${
            Theme === "Light"
              ? "bg-white/80 text-slate-700 placeholder:text-slate-400 border border-white shadow-lg focus:ring-2 focus:ring-indigo-400"
              : "bg-white/10 text-white placeholder:text-gray-300 border border-white/10 focus:ring-2 focus:ring-indigo-400"
          }`}
        />

   
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          className={`w-full px-5 py-4 rounded-2xl outline-none text-lg transition-all duration-300
          ${
            Theme === "Light"
              ? "bg-white/80 text-slate-700 placeholder:text-slate-400 border border-white shadow-lg focus:ring-2 focus:ring-indigo-400"
              : "bg-white/10 text-white placeholder:text-gray-300 border border-white/10 focus:ring-2 focus:ring-indigo-400"
          }`}
        />

      
        <button
          onClick={handlesubmit}
          className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-95
          ${
            Theme === "Light"
              ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl"
              : "bg-indigo-500 text-white hover:bg-indigo-600 shadow-xl"
          }`}
        >
          Sign In
        </button>
      </div>

     
      <p
        className={`text-center text-sm mt-6 ${
          Theme === "Light" ? "text-slate-500" : "text-gray-300"
        }`}
      >
        Secure login for your personal notes
      </p>
    </div>
  </div>
);
}

export default LogIn
