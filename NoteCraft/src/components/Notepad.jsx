import { useState, useMemo, useRef, useContext, useEffect } from "react";
import JoditEditor from "jodit-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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
      const stored = sessionStorage.getItem("aiNote");

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

      <Second />



    </div>

  )

 return (
  <div
    className={`min-h-screen flex flex-col items-center p-6 transition-all duration-500
    ${
      Theme === "Light"
        ? "bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200"
        : ""
    }`}
  >
    <div className="w-full max-w-5xl mt-24">

     
      <div
        className={`flex flex-wrap items-start justify-between gap-6 mb-8`}
      >
       
   

        
        <form className="flex flex-col gap-4 flex-1 min-w-[280px]">
     
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={`w-full px-6 py-4 rounded-2xl outline-none text-lg transition-all duration-300 border backdrop-blur-xl
            ${
              Theme === "Light"
                ? "bg-white/80 text-slate-700 border-white shadow-xl focus:ring-2 focus:ring-indigo-400"
                : "bg-white/10 text-white border-white/10 focus:ring-2 focus:ring-indigo-400"
            }`}
          >
            <option value="" disabled>
              Select Subject
            </option>

            {subjects.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>

      
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title"
            className={`w-full px-6 py-4 rounded-2xl outline-none text-lg transition-all duration-300 border backdrop-blur-xl
            ${
              Theme === "Light"
                ? "bg-white/80 text-slate-700 placeholder:text-slate-400 border-white shadow-xl focus:ring-2 focus:ring-indigo-400"
                : "bg-white/10 text-white placeholder:text-gray-300 border-white/10 focus:ring-2 focus:ring-indigo-400"
            }
            ${
              error === "title" || error === "Both"
                ? "ring-2 ring-red-400 animate-pulse"
                : ""
            }`}
          />
        </form>

       
        <div
          className={`p-4 rounded-3xl border backdrop-blur-xl transition-all duration-300
          ${
            Theme === "Light"
              ? "bg-white/70 border-white/40 shadow-2xl"
              : "bg-white/10 border-white/10 shadow-2xl"
          }`}
        >
          <Calendar
            onChange={setDate}
            value={date}
            className="bg-transparent border-none"
          />
        </div>
      </div>

      
      <div
        className={`rounded-3xl overflow-hidden border backdrop-blur-xl transition-all duration-300
        ${
          Theme === "Light"
            ? "bg-white/70 border-white/40 shadow-2xl"
            : "bg-white/10 border-white/10 shadow-2xl"
        }`}
      >
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onBlur={(newContent) => setContent(newContent)}
          onChange={() => {}}
        />
      </div>

 
      <div className="flex flex-wrap justify-between items-center gap-4 mt-8">

        
        <button
          onClick={handleSubmit}
          className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95
          ${
            Theme === "Light"
              ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl"
              : "bg-indigo-500 text-white hover:bg-indigo-600 shadow-xl"
          }`}
        >
          Submit
        </button>

    
        <button
          onClick={handelAi}
          className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95
          ${
            Theme === "Light"
              ? "bg-slate-900 text-white hover:bg-black shadow-xl"
              : "bg-white text-slate-900 hover:bg-gray-200 shadow-xl"
          }`}
        >
          <Bot size={18} />
          ENTER AI MODE
        </button>

       
        <button
          onClick={handleClear}
          className="p-3 rounded-2xl  text-white  hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl"
        >
          <img src={Trash} alt="clear" className="h-20 w-20" />
        </button>

      </div>
    </div>
  </div>
);
};

export default Notepad;