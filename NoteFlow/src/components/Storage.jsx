import React, { useEffect , useState} from 'react'
import { Notes } from './mockData';
import Home from './Home';
const Storage = () => {

    const [data, setData] = useState([]);
    useEffect(() => {
    
    const savedData = JSON.parse(localStorage.getItem("myData"));
    if (savedData) {
      setData(savedData);
    } else {
      const initialMockData = Notes
      setData(initialMockData);
      localStorage.setItem("myData", JSON.stringify(initialMockData));
    }
  }, []);


  return (
    <div>

        <Home data = {data}/>


    </div>
  )
}

export default Storage
