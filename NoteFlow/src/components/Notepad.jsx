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

  const [subject, setSubject] = useState('');
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
    

        <div className={Theme ==='Light'?"min-h-screen flex flex-col items-center space-y-8 p-6 bg-white/70 backdrop-blur":"min-h-screen flex flex-col items-center space-y-8 p-6 bg-gray-500 dark:bg-transparent border-4"}>


      <div className="w-full max-w-5xl mt-20 ">

     
        <div className={`flex ${error ? "justify-between" : "justify-center gap-6"} items-center flex-wrap`}>

          {error && <Robot />}

      
          <form className="flex flex-col space-y-3 items-center">

            <select
              className="border p-2 rounded-xl w-[200px] bg-gray-100 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 focus:outline-none"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="" disabled>Select Subject</option>
              {subjects.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>

            <input
              className={`p-2 rounded-xl border ${
                error === 'title' || error === 'Both'
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } bg-gray-200 dark:bg-gray-800/50 text-black dark:text-white focus:outline-none`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
              type="text"
            />

          </form>

        
          <div className="bg-white/80 dark:bg-gray-800/50 rounded-xl p-2 backdrop-blur-md">
            <Calendar onChange={setDate} value={date} />
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