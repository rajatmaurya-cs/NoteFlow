import React, { useContext, useState } from "react";
import axios from "axios";
import { Search, SendHorizonal, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "./Animation/Loader";

import copilot from '../assets/copilot.png'
import Meta from '../assets/meta.png'
import claude from '../assets/claude.png'
import chatgpt from '../assets/chatgpt2.png'

import Gemini from "./Animation/Gemini";

import { ToggleTheme } from "./AuthProvider";
import { Listbox } from '@headlessui/react'


const Aimode = () => {

  const models = [
    { id: 'llama-3.1-8b-instant', name: 'Meta 3.2', desc: 'Fast' },
    { id: 'groq/compound', name: 'Claude', desc: 'Advanced code & Debugging' },
    { id: 'qwen/qwen3-32b', name: 'Copilot', desc: 'Advanced Math Problems' },
    { id: 'openai/gpt-oss-120b', name: 'ChatGPT 5.1', desc: 'Tough Reasoning' },
  ]

  const Navigate = useNavigate();

  const { Theme } = useContext(ToggleTheme)

  const [question, setQuestion] = useState("");

  const [askedQuestion, setAskedQuestion] = useState("");

  const [res, setRes] = useState("");

  const [loading, setLoading] = useState(false);

  




  const [model, setModel] = useState(models[0]);



  const askGroq = async () => {

    console.log("The Model used: ",model.id);


  

    setQuestion('')
    setAskedQuestion('');
    

    console.log("SENDING MODEL:", model);

    if (question === '') {

      toast.error("Ask Something...")

      return;

    }

    setLoading(true);
  
    setAskedQuestion(question);



    try {
      const response = await axios.post("http://localhost:3000/api/ai", {
        question: question,
        model: model.id,
      });



      setTimeout(() => {

        setRes(response.data.result);

      }, 3000)

      sessionStorage.setItem(
        "aiNote",
        JSON.stringify({
          question: question,
          answer: response.data.result,
        })
      );



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
          <div className="flex justify-end mt-5">
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



          {model.id === 'qwen/qwen3-32b' && <img src={copilot} className="w-20 h-20" alt="" />}

          {model.id === 'llama-3.1-8b-instant' && <img src={Meta} className="w-20 h-20" alt="" />}

          {model.id === 'groq/compound' && <img src={claude} className="w-20 h-20" alt="" />}

          {model.id === 'openai/gpt-oss-120b' && <img src={chatgpt} className="w-20 h-20" alt="" />}




          <Listbox value={model} onChange={(value) => setModel(value)} >
            <div className="relative w-fit">
              <Listbox.Button className="relative w-full bg-[#1f1f1f] text-white px-5 py-2 rounded-lg border border-gray-600 text-left">
                {model.name}
              </Listbox.Button>

              <Listbox.Options className="absolute bottom-full mb-1 w-65 bg-[#1f1f1f] rounded-lg border border-gray-600 z-50 max-h-60 overflow-y-auto">
                {models.map((item) => (
                  <Listbox.Option
                    key={item.id}
                    value={item}
                    className="px-5 py-2 text-white hover:bg-[#2a2a2a] cursor-pointer"
                  >
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>


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
            <SendHorizonal size={30} />
          </button>}


          {res && <div
            onClick={ImportNotePad}
            className="bg-white text-black p-2 rounded-full cursor-pointer hover:scale-105 duration-200"
          >
            <Download size={30} />
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Aimode;