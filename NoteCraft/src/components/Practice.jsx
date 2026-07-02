import React, { useState } from 'react';

import { Listbox } from '@headlessui/react'
const Practice = () => {

  const names = ["Rajat","Mayank","Abhinav","Harshit"]

  const [ user , setUser] = useState("Raka")

  console.log("The user is: ",user)

  return (
<div className='min-h-screen min-w-full flex items-center justify-center'>

    <Listbox value = {user} onChange={(value)=>setUser(value)}>
      <Listbox.Button>
        {user}
          </Listbox.Button>
        <Listbox.Options className={"border-4 bg-gray-400 gap-5"}>
          {
            names.map((item , idx)=>{
              return (
                <Listbox.Option
                className={" mb-5"}
                value = {item}
                key = {idx}
                >
                  {item}
                  <p>very efficient</p>
                  <p>bab don </p>
                </Listbox.Option>
              )
            })
            
          }
        </Listbox.Options>
    
    </Listbox>

</div>
  
  
  );
}



export default Practice;
