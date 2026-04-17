import React, { useContext, useState } from "react";
import axios from "axios";
import { Search, SendHorizonal, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "./Animation/Loader";

import Gemini from "./Animation/Gemini";

import { ToggleTheme } from "./AuthProvider";


const Aimode = () => {
  const Navigate = useNavigate();
  const { Theme } = useContext(ToggleTheme)

  const [question, setQuestion] = useState("");

  const [askedQuestion, setAskedQuestion] = useState("");

  const [res, setRes] = useState("");

  const [loading, setLoading] = useState(false);




  const [model, setModel] = useState("llama-3.1-8b-instant");



  const askGroq = async () => {

    console.log("SENDING MODEL:", model);

    if (question === '') {

      toast.error("Ask Something...")

      return;

    }

    setAskedQuestion('');

    setRes('');

    setLoading(true);

    setAskedQuestion(question);



    try {
      const response = await axios.post("http://localhost:3000/api/a", {
        question: question,
        model: model,
      });



      setTimeout(() => {

        setRes(response.data.result);

      }, 3000)

      localStorage.setItem(
        "aiNote",
        JSON.stringify({
          question: question,
          answer: response.data.result,
        })
      );



      setQuestion("");
    } catch (error) {

      console.log(error);

      setRes("Error occurred");

      setLoading(false);

    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000)

    }
  };

  const ImportNotePad = () => {
    if (askedQuestion === "" || res === "") {
      toast.error("Nothing to Import");
      return;
    }

    toast.success("Imported Successfully");
    Navigate('/notepad')
  };

  return (
    <div className={Theme === 'Light' ? "w-full min-h-screen   text-white  flex flex-col items-center px-4" : "w-full min-h-screen text-white  flex flex-col items-center px-4"}>


      <div className="w-full max-w-4xl flex-1 overflow-y-auto pt-10 pb-40 space-y-6 mt-15">

        {askedQuestion && (
          <div className="flex justify-end">
            <div className="bg-[#303030] px-5 py-4 rounded-2xl max-w-2xl text-white shadow-md">
              {askedQuestion}
            </div>
          </div>
        )}

        {res && (
          <div className="flex justify-start">
            <div className="bg-[#2f2f2f] px-5 py-4 rounded-2xl max-w-3xl text-gray-100 leading-8 whitespace-pre-wrap shadow-md">
              {res}
            </div>
          </div>
        )}

        {!askedQuestion && !res && (
          <div className="text-center text-gray-400 mt-32 text-2xl">
            How can I help you today?
          </div>
        )}

        {loading && <Gemini />}
      </div>


      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4">
        <div className="bg-[#2f2f2f] rounded-3xl px-5 py-4 flex items-center gap-4 border border-gray-700 shadow-xl">

          <Search className="text-gray-400 w-5 h-5" />


          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="bg-[#1f1f1f] text-white px-3 py-2 rounded-lg outline-none border border-gray-600"
          >



            <option value={"llama-3.1-8b-instant"}>
              llama 3.2
            </option>
            <option value={"groq/compound"}>
              Groq 🚀
            </option>
            <option value={"qwen/qwen3-32b"}>
              Qwen 3.5
            </option>

            <option value={"openai/gpt-oss-120b"}>
             ChatGpt 5.1
            </option>




          </select>


          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && askGroq()}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
          />


          {!loading && <button
            onClick={askGroq}
            className="bg-white text-black p-2 rounded-full hover:scale-105 duration-200"
            disabled={loading}
          >
            <SendHorizonal size={18} />
          </button>}


          {res && <div
            onClick={ImportNotePad}
            className="bg-white text-black p-2 rounded-full cursor-pointer hover:scale-105 duration-200"
          >
            <Download size={18} />
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Aimode;