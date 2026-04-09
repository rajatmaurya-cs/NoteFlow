import {Routes, Route} from 'react-router-dom'

import Home from './components/Home'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Notepad from './components/Notepad'
import Activity from './components/Activity'
import Diary from './components/Diary'
import Card from './components/Card'


import Storage from './components/Storage'
import Car from './components/Animation/Car'

function App() {



  return (
   <>
   <main>

     <Navbar />
   
   </main>
  
   <Routes>

    

    <Route path = '/' element = {<Storage/>}/>

    <Route path = '/Card/:Id' element = {<Card/>}/>

    <Route path = '/Header' element = {<Header/>}/>

     <Route path = '/diary' element = {<Diary/>}/>

     <Route path = '/notepad' element = {<Notepad/>}/>

    <Route path = '/activity' element = {<Activity/>}/>

      

   





   </Routes>
   
   
   </>
  )
}

export default App
