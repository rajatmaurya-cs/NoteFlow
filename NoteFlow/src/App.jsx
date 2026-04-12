import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { ToggleTheme } from './components/AuthProvider';

import Home from './components/Home';
import Navbar from './components/Navbar';
import Notepad from './components/Notepad';
import Activity from './components/Activity';
import Diary from './components/Diary';
import Card from './components/Card';
import Actions from './components/Actions';
import Storage from './components/Storage';
import LogIn from './components/LogIn';
import Practice from './components/Practice';
import Pan from './components/Animation/Pan'
import Wall from './components/Animation/Pattern';
import Night from './components/Animation/Night'

function App() {

  const { Theme } = useContext(ToggleTheme);

  return (
    <div className="relative min-h-screen">

     
      {Theme === "Dark" && (
        <div className="fixed inset-0 -z-100">
          < Night/>
        </div>
      )}
     {/* {Theme === "Light" && (
        <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center">
          <Wall />
        </div>
      )} */}

   
      <main>
        <Navbar />
      </main>

     
      <div className="relative z-10">
        <Routes>

          <Route path='/' element={<Storage />} />
          <Route path='/Card/:Id' element={<Card />} />
          <Route path='/diary' element={<Diary />} />
          <Route path='/notepad' element={<Notepad />} />
          <Route path='/activity' element={<Activity />} />
          <Route path='/actions' element={<Actions />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/y' element={<Practice />} />

        </Routes>
      </div>

    </div>
  );
}

export default App;