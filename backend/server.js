import "dotenv/config";

import express from "express";

import cors from "cors";

import askGroq from "./groq.js";




const app = express();

const PORT = 3000;


app.use(cors());

app.use(express.json());

app.get('/',(req,res)=>{
  res.status(200).json({
    success:"✅",
    message:"Server is Runnign Perfectly ✈️ 🚀"
  })
})



app.post('/api/ai', async (req,res)=>{

  console.log("Entered in Groq")

  try{


  
  const {question} = req.body;
  const {model} = req.body

  console.log("The Model is: ",model)

  console.log("The quesiton is: ",question);
  
  const answer = await askGroq(question, model);

  console.log(answer)

  res.status(200).json({
    success:true,
    result:answer,
  })

  }catch(error){

    res.status(401).json({
      success:false,
      message:"Content retreival failed"
    })


  }


})


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});