import React, { useState, useMemo } from "react";
import JoditEditor from "jodit-react";
import { Notes } from "./mockData";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Robot from "./Animation/Robot";
import Trash from "./Animation/Trash";
const Notepad = () => {



    const [subject, setsubject] = useState('');
    const [title, settitle] = useState('');

    const [date, setDate] = useState(new Date());

    const [content, setContent] = useState("");

    const [error, setError] = useState(true);


    const config = useMemo(() => ({
        readonly: false,
        placeholder: "Start typing...",
        height: 400,
    }), []);

    // const handlesubmit = (e)=>{
    //     e.preventDefault();
    // }

    return (
        <div className="min-w-7xl flex justify-center items-center flex-col space-y-7">

        

            


            <div className = {error?"flex justify-between max-w-full min-w-5xl mt-8":" flex max-w-full min-w-5xl justify-center space-x-5 mt-8"}>

                

                {error ?<Robot/> :""}


             <form className="flex flex-col space-y-3 max-w-2xl  items-center justify-center"
                action="">

                <input
                    className="border-blue-700 border-4 p-3 rounded-4xl max-w-fit"
                    onChange={(e) => setsubject(e.target.value)}
                    value={subject}
                    placeholder="Enter Subject"
                    type="text" />

                <input
                    className="border-blue-700 border-4 p-3 rounded-4xl max-w-fit"
                    onChange={(e) => settitle(e.target.value)}
                    value={title}
                    placeholder="Enter Title"
                    type="text" />


            </form>


                <Calendar
                    onChange={setDate}
                    value={date}
                />


            </div>


            



            <JoditEditor

                value={content}
                config={config}
                onChange={(e) => setContent(e.target.value)}
            />

          

           





        </div>
    );
};

export default Notepad;