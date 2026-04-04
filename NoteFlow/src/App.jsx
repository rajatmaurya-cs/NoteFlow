import {Routes, Route} from 'react-router-dom'

import Home from './components/Home'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Notepad from './components/Notepad'
function App() {



  return (
   <>
   <main>

     <Navbar />
   
   </main>
  
   <Routes>

    

    <Route path = '/' element = {<Home/>}/>

    <Route path = '/Header' element = {<Header/>}/>

     <Route path = '/notepad' element = {<Notepad/>}/>

   





   </Routes>
   
   
   </>
  )
}

export default App
