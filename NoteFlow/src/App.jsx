import {Routes, Route} from 'react-router-dom'

import Home from './components/Home'
import Navbar from './components/Navbar'

import Notepad from './components/Notepad'
import Activity from './components/Activity'
import Diary from './components/Diary'
import Card from './components/Card'
import Actions from './components/Actions'


import Storage from './components/Storage'

import LogIn from './components/LogIn'


function App() {



  return (
   <>
   <main>

     <Navbar />
   
   </main>
  
   <Routes>

    

    <Route path = '/' element = {<Storage/>}/>

    <Route path = '/Card/:Id' element = {<Card/>}/>

     <Route path = '/diary' element = {<Diary/>}/>

     <Route path = '/notepad' element = {<Notepad/>}/>

    <Route path = '/activity' element = {<Activity/>}/>

     <Route path = '/actions' element = {<Actions/>}/>

    <Route path = '/login' element = {<LogIn/>}/>

   </Routes>
   
   
   </>
  )
}

export default App
