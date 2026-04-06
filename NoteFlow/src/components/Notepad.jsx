import React, { useState, useMemo } from "react";
import JoditEditor from "jodit-react";
import { Notes } from "./mockData";
const Notepad = () => {

//    <JoditEditor

//                 value={content}
//                 config={config}
//                 onChange={(e)=>setContent(e.target.value)}
//             />
//  src="https://img.icons8.com/3d-fluency/94/trash.png"

        const [subject,setsubject] = useState('');
        const [title , settitle] = useState('');
        const[date , setdate] = useState('');

    const [content, setContent] = useState("");


    // const config = useMemo(() => ({
    //     readonly: false,
    //     placeholder: "Start typing...",
    //     height: 400,
    // }), []);

    // const handlesubmit = (e)=>{
    //     e.preventDefault();
    // }

    return (
        <div style={{ maxWidth: "800px", margin: "40px auto" }}>
          

            <form action="">
            <input 
            onChange={(e)=>setsubject(e.target.value)}
            value = {subject}
            placeholder="Enter Subject"
            type="text" />
           



            </form>
                
         

        </div>
    );
};

export default Notepad;