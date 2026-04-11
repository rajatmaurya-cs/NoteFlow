import React, { useContext, useState } from 'react'
import { LoggedInContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import Done from './Animation/Done';
import Pan from './Animation/Pan';
import Egg from './Animation/Egg';
const LogIn = () => {

  const { setUser } = useContext(LoggedInContext)

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [done , setdone] = useState(false);


  const handlesubmit = () => {

    console.log("Entered in handlesubmit")

    if (email == '' || password == '') {
      toast.error("All Fields are required")
      return;
    }

    setUser(true);

    sessionStorage.setItem('user',JSON.stringify(""))

     setdone(true);

    setTimeout(()=>{
      
     
      navigate('/')

    },3000)

   



  }

  if(done) return( 

  <div className='min-w-full min-h-screen flex justify-center items-center'>

    <Done/>

  </div>




)
return (
  <div className="min-h-screen flex justify-center items-center bg-blue-50 px-4">

    <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-blue-100 p-8 flex flex-col justify-center">

   
     

      <div className='ml-30'>

         <Egg/>
        {/* <Pan/> */}


      </div>

      
      

    
      <div className="flex flex-col gap-5 mt-20">

      
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 rounded-lg border-4 border-green-500 focus:border-4 focus:border-green-500 focus:outline-none"
         
        />

    
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        className="w-full p-3 rounded-lg border-4 border-[#ffca3a] focus:border-4 focus:border-[#ffca3a]  focus:outline-none"
        />

        
        <button
          onClick={handlesubmit}
          className="w-full bg-blue-600 text-white p-3 rounded-lg 
          hover:bg-blue-700 transition duration-200"
        >
          Sign In
        </button>

      </div>

    </div>
  </div>
)
}

export default LogIn
