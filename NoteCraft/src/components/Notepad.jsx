import { useState, useMemo, useRef, useContext, useEffect } from "react";
import JoditEditor from "jodit-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Robot from "./Animation/Robot";
import toast from "react-hot-toast";
import { Report } from 'notiflix';
import Trash from '../assets/Trash2.png';
import { htmlToText } from "html-to-text";
import { ToggleTheme } from "./AuthProvider";
import Radio from "./Animation/Radio";
import { useNavigate } from "react-router-dom";
import { subjects } from "./Home";
import { marked } from "marked";

import { Sparkles, Bot } from "lucide-react";

import Second from './Animation/Second'


const Notepad = () => {

  const navigate = useNavigate();

  const user = sessionStorage.getItem("user");

  const editor = useRef(null);

  const { Theme } = useContext(ToggleTheme);

  const [subject, setSubject] = useState('ALL');

  const [title, setTitle] = useState('');

  const [date, setDate] = useState(new Date());

  const [error, setError] = useState('');

  const [content, setContent] = useState('');

  const [loading, setloading] = useState(false);

  const config = useMemo(() => ({
    readonly: false,
    placeholder: "Start typing...",
    height: 400,
  }), []);


  useEffect(() => {
    try {
      const stored = localStorage.getItem("aiNote");

      if (!stored) return;

      const res = JSON.parse(stored);

      if (res?.question && res?.answer) {
        setContent(marked(res.answer));
      }
    } catch (error) {
      console.log("Error loading aiNote:", error);
    }
  }, []);

  const handleSubmit = (e) => {
    console.log("Entered in handleSubmit");
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    e.preventDefault();

    if (!title && !subject) {
      setError("Both");
      toast.error("All fields are required");
      return;
    }

    if (!subject) {
      setError("subject");
      return;
    }

    if (!title) {
      setError("title");
      return;
    }



    const editorData = content.replace(/(color\s*:\s*[^;"]+;?|caret-color\s*:\s*[^;"]+;?)/gi, "").replace(/style="\s*"/gi, "");

    if (!editorData || editorData === '<p><br></p>') {
      Report.failure('Content required');
      return;
    }

    const plainText = htmlToText(editorData).trim();

    if (!plainText) {
      Report.failure('Content required');
      return;
    }

    const newItem = {
      id: Math.random(),
      subject,
      title,
      date: date.toLocaleDateString('en-CA'),
      description: editorData,
      published: true,
    };

    const oldData = JSON.parse(localStorage.getItem("myData")) || [];
    const updatedData = [...oldData, newItem];
    localStorage.setItem("myData", JSON.stringify(updatedData));

    toast.success("Note Added Successfully");
    Report.success('Note Built Successfully');

    setTitle('');
    setSubject('');
    setContent('');
    setError('');
    localStorage.setItem(
      "aiNote",
      JSON.stringify({
        question: null,
        answer: null,
      })
    );
  };

  const handleClear = () => {
    setContent('');
  };

  if (!user) {
    return (
      <div
        onClick={() => navigate('/login')}
        className="min-w-full min-h-screen flex justify-center items-center"
      >
        <Radio />
      </div>
    );
  }

  const handelAi = () => {
    setloading(true);
    setTimeout(() => {
      navigate('/ai');
    }, 3000);
  }

  if (loading) return (
    <div className="flex flex-col">

     <Second/>
     
     

    </div>

  )

  return (
    <div className={Theme === 'Light' ? "min-h-screen flex flex-col items-center space-y-8 p-6 bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200" : "min-h-screen flex flex-col items-center space-y-8 p-6 bg-gray-500 dark:bg-transparent border-4"}>

      <div className="w-full max-w-5xl mt-20 ">

        <div className={`flex ${error ? "justify-between" : "justify-center gap-6"} items-center flex-wrap`}>
          {error && <Robot />}

          <form className="flex flex-col space-y-3 items-center">
            <select
              className={`
                w- px-4 py-2 rounded-xl focus:outline-none transition-all duration-300
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
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="" disabled>Select Subject</option>
              {subjects.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>

            <input
              className={`
                w- px-4 py-2 rounded-xl focus:outline-none transition-all duration-300
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
                ${error === 'title' || error === 'Both'
                  ? "ring-2 ring-red-400 animate-pulse"
                  : ""}
              `}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
              type="text"
            />
          </form>

          <div
            className={`
              p-4 rounded-2xl transition-all duration-300
              ${Theme === "Light"
                ? `
                  bg-[#e0e5ec]
                  shadow-[inset_6px_6px_12px_#a3b1c6,_inset_-6px_-6px_12px_#ffffff]
                `
                : `
                  bg-[#1f2937]
                  shadow-[inset_5px_5px_10px_#0b1120,_inset_-5px_-5px_10px_#374151]
                `}
            `}
          >
            <Calendar
              onChange={setDate}
              value={date}
              className="bg-transparent border-none w-full"
            />
          </div>
        </div>

        <div className="mt-6 rounded-xl overflow-hidden">

          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onBlur={newContent => setContent(newContent)} 
            onChange={() => { }} 
          />

        </div>

       

        <div className="flex justify-between items-center mt-6 flex-wrap gap-4">

         
          <button
            onClick={handleSubmit}
            className={`
      px-6 py-2.5 rounded-xl font-medium transition-all duration-300
      ${Theme === "Light"
                ? "bg-white text-gray-800 border border-gray-200 hover:bg-gray-100 shadow-sm"
                : "bg-gray-900 text-white border border-gray-700 hover:bg-gray-800"
              }
    `}
          >
            Submit
          </button>

      
          <button
            onClick={handelAi}
            className={`
      flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300
      ${Theme === "Light"
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-white text-black hover:bg-gray-200"
              }
    `}
          >
            <Bot size={16} />
            AI Mode
            <Sparkles size={14} />
          </button>


          <img
            onClick={handleClear}
            className="h-16 w-16 cursor-pointer hover:scale-105 transition"
            src={Trash}
            alt="clear"
          />

        </div>
      </div>
    </div>
  );
};

export default Notepad;