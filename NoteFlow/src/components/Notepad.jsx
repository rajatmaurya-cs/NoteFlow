import React, { useState, useMemo ,useRef} from "react";
import JoditEditor from "jodit-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Robot from "./Animation/Robot";
import toast from "react-hot-toast";
import { Report } from 'notiflix';
import Trash from '../assets/Trash2.png'
import { htmlToText } from "html-to-text";


const Notepad = () => {

    const editor = useRef(null);



    const [subject, setsubject] = useState('');
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
            top: -1000,   // negative value scrolls up
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

        console.log(plainText);


           if(plainText === ''){
              Report.failure(
                
                  'Content required',
                
                );
                return ;
        }

        console.log(date.toISOString().split('T')[0])

        const newItem = {
            id: Math.random(),
            subject: subject,
            title: title,
            date: date.toISOString().split('T')[0],
            description: plainText,
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
                ref={editor}
               
                config={config}
               
            />


            <div className="min-w-5xl flex items-center justify-between mb-10">

                <button onClick={(e) => handlesubmit(e)}

                    className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all shadow-md">
                    Submit
                </button>


                <img
                    onClick={() =>  editor.current.value = ''}
                    className="h-40 w-40 hover:cursor-pointer"

                    src={Trash} alt="" />



            </div>







        </div>
    );
};

export default Notepad;