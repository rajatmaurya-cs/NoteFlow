import { useState, useMemo, useRef, useContext } from "react";
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

const Notepad = () => {

  const navigate = useNavigate();
  const user = sessionStorage.getItem("user");
  const editor = useRef(null);
  const { Theme } = useContext(ToggleTheme);

  const [subject, setSubject] = useState('ALL');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState('');


  const config = useMemo(() => ({
    readonly: false,
    placeholder: "Start typing...",
    height: 400,
    direction: "ltr",
    iframe: true,
    iframeStyle: `
      body {
        background: ${Theme === "Light" ? "#ffffff" : "transparent"} !important;
        color: ${Theme === "Light" ? "#000000" : "#ffffff"} !important;
      }
    `
  }), [Theme]);

  const handleSubmit = (e) => {

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

    const editorData = editor.current.value;
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
      description: plainText,
      published: true,
    };

    const oldData = JSON.parse(localStorage.getItem("myData")) || [];
    const updatedData = [...oldData, newItem];
    localStorage.setItem("myData", JSON.stringify(updatedData));
    // localStorage.setItem("myData", JSON.stringify(editor.current.value));

    toast.success("Note Added Successfully");
    Report.success('Note Built Successfully');

    setTitle('');
    setSubject('');
    editor.current.value = '';

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

  return (


    <div className={Theme === 'Light' ? "min-h-screen flex flex-col items-center space-y-8 p-6 bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200" : "min-h-screen flex flex-col items-center space-y-8 p-6 bg-gray-500 dark:bg-transparent border-4"}>


      <div className="w-full max-w-5xl mt-20 ">


        <div className={`flex ${error ? "justify-between" : "justify-center gap-6"} items-center flex-wrap`}>

          {error && <Robot />}


          <form className="flex flex-col space-y-3 items-center">

            <select
              className={`
      w-[220px] px-4 py-2 rounded-xl focus:outline-none transition-all duration-300
      
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
      w-[220px] px-4 py-2 rounded-xl focus:outline-none transition-all duration-300
      
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
          <JoditEditor ref={editor} config={config} />
        </div>


        <div className="flex justify-between items-center mt-6">

          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition"
          >
            Submit
          </button>

          <img
            onClick={() => editor.current.value = ''}
            className="h-24 w-24 cursor-pointer hover:scale-105 transition"
            src={Trash}
            alt="clear"
          />

        </div>

      </div>

    </div>
  );
};

export default Notepad;