import {Routes, Route} from 'react-router-dom'

import Home from './components/Home'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Notepad from './components/Notepad'
import Activity from './components/Activity'

import Storage from './components/Animation/Storage'

function App() {



  return (
   <>
   <main>

     <Navbar />
   
   </main>
  
   <Routes>

    

    <Route path = '/' element = {<Storage/>}/>

    <Route path = '/Header' element = {<Header/>}/>

     <Route path = '/notepad' element = {<Notepad/>}/>

    <Route path = '/activity' element = {<Activity/>}/>

   





   </Routes>
   
   
   </>
  )
}

export default App
