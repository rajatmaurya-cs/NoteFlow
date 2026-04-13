import { createContext, useState } from "react";


export const ToggleTheme = createContext(null);


const LoggedInProvider = ({ children }) => {  
  
  const [Theme, setTheme] = useState('Light');

  return (
    <ToggleTheme.Provider value={{ Theme, setTheme }}>
      {children}
    </ToggleTheme.Provider>
  );
}

export default LoggedInProvider;