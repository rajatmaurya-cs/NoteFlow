import React, { useState, useMemo } from "react";
import JoditEditor from "jodit-react";
import { Notes } from "./mockData";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Robot from "./Animation/Robot";
import toast from "react-hot-toast";

import Trash from '../assets/Trash2.png'
const Notepad = () => {



    const [subject, setsubject] = useState('');
    const [title, settitle] = useState('');

    const [date, setDate] = useState(new Date());

    const [content, setContent] = useState("");

    const [error, setError] = useState('');


    const config = useMemo(() => ({
        readonly: false,
        placeholder: "Start typing...",
        height: 400,
    }), []);

    const handlesubmit = (e) => {
        e.preventDefault();

        if (title === '' && subject === '') {
            setError("Both")
            toast.error("All Fields are required")
            return
        }

        if (subject === '') {
            setError("Subject filed required")
            return;

        }
        if (title === '') {
            setError("Title field is required")
            return;

        }
        const newItem = {
            id: Math.random(), // ideally use uuid for real apps
            subject: subject,
            title: title,
            date: date,
            description: content,
            published: true,
        };

        const oldData = JSON.parse(localStorage.getItem("myData")) || [];
        const updatedData = [...oldData, newItem]; 
        localStorage.setItem("myData", JSON.stringify(updatedData));
        toast.success("Note Added Successfully");



    }

    return (
        <div className="min-w-7xl flex justify-center items-center flex-col space-y-7">






            <div className={error ? "flex justify-between max-w-full min-w-5xl mt-8" : " flex max-w-full min-w-5xl justify-center space-x-5 mt-8"}>



                {error ? <Robot /> : ""}


                <form className="flex flex-col space-y-3 max-w-2xl  items-center justify-center"
                    action="">

                    <input
                        className={error === 'subject' || error === 'Both' ? "border-4 p-3 rounded-4xl max-w-fit border-red-500 animate-bounce" : "border-blue-700 border-4 p-3 rounded-4xl max-w-fit"}
                        onChange={(e) => setsubject(e.target.value)}
                        value={subject}
                        placeholder="Enter Subject"
                        type="text" />

                    <input
                        className={error === 'title' || error === 'Both' ? "border-4 p-3 rounded-4xl max-w-fit border-red-500 animate-bounce" : "border-blue-700 border-4 p-3 rounded-4xl max-w-fit"}
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
                onChange={(e) => setContent(e)}
            />


            <div className="min-w-5xl flex items-center justify-between mb-10">

                <button onClick={(e) => handlesubmit(e)}

                    className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all shadow-md">
                    Submit
                </button>


                <img
                    onClick={() => setContent('')}
                    className="h-40 w-40 hover:cursor-pointer"

                    src={Trash} alt="" />



            </div>







        </div>
    );
};

export default Notepad;