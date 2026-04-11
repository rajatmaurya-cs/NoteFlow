import { useState, useMemo, useRef, useContext } from "react";
import JoditEditor from "jodit-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Robot from "./Animation/Robot";
import toast from "react-hot-toast";
import { Report } from 'notiflix';
import Trash from '../assets/Trash2.png'
import { htmlToText } from "html-to-text";

import Radio from "./Animation/Radio";
import {useNavigate } from "react-router-dom";

import { subjects } from "./Home";
 

const Notepad = () => {

    const navigate = useNavigate();

    const user = sessionStorage.getItem("user");

    const editor = useRef(null);

    // const { user } = useContext(LoggedInContext)



    const [subject, setsubject] = useState('All');

    const [title, settitle] = useState('');

    const [date, setDate] = useState(new Date());



    const [error, setError] = useState('');


    const config = useMemo(() => ({
        readonly: false,
        placeholder: "Start typing...",
        height: 400,
        direction: "ltr"
    }), []);

    const handlesubmit = (e) => {
        window.scrollBy({
            top: -1000,
            behavior: "smooth"
        });
        e.preventDefault();

        if (title === '' && subject === '') {
            setError("Both")
            toast.error("All Fields are required")
            return
        }

        if (subject === '') {
            setError("subject")
            return;

        }
        if (title === '') {
            setError("title")
            return;

        }

        const editorData = editor.current.value;

        const plainText = htmlToText(editorData).trim();

      

        console.log("The Content is: ",plainText)


        if (plainText === '') {
            Report.failure(

                'Content required',

            );
            return;
        }

        console.log(date.toISOString().split('T')[0])

        const newItem = {
            id: Math.random(),
            subject: subject,
            title: title,
            date: date.toLocaleDateString('en-CA'),
            description: plainText,
            published: true,
        };

        const oldData = JSON.parse(localStorage.getItem("myData")) || [];

        const updatedData = [...oldData, newItem];

        localStorage.setItem("myData", JSON.stringify(updatedData));

        toast.success("Note Added Successfully");

        settitle('')

        setsubject('')

        editor.current.value = '';

        Report.success(

            'Note Built Successfully',

        );


    }

    if (!user) return (

        <div onClick={()=> navigate('/login')}
        className="min-w-full min-h-screen flex justify-center items-center">

            <Radio/>

        </div>
    )





    return (



        <div className="min-w-7xl flex justify-center items-center flex-col space-y-7">






            <div className={error ? "flex justify-between max-w-full min-w-5xl mt-8" : " flex max-w-full min-w-5xl justify-center space-x-5 mt-30"}>



                {error ? <Robot /> : ""}


                <form className="flex flex-col space-y-3 max-w-2xl  items-center justify-center"
                    action="">

                    <select
                        className="border-4 border-blue-600 p-2 rounded-4xl w-[210px] bg-gray-400"
                        value={subject}
                        onChange={(e) => setsubject(e.target.value)}
                        name="" id="">

                        <option value="" disabled>Select Subject</option>
                        {subjects.map((item , index) => {
                            return (
                                <option  key ={index} value={item}>{item}</option>
                            )
                        })}
                    </select>

                    <input
                        className={error === 'title' || error === 'Both' ? "border-4 p-2 rounded-4xl max-w-fit border-red-500 animate-pulse" : "border-blue-700 border-4 p-2 rounded-4xl max-w-fit"}
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
                ref={editor}

                config={config}

            />


            <div className="min-w-5xl flex items-center justify-between mb-10">

                <button onClick={(e) => handlesubmit(e)}

                    className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all shadow-md">
                    Submit
                </button>


                <img
                    onClick={() => editor.current.value = ''}
                    className="h-40 w-40 hover:cursor-pointer"

                    src={Trash} alt="" />



            </div>







        </div>
    );
};

export default Notepad;