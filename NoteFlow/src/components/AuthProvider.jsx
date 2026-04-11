import { createContext, useState } from "react";


export const LoggedInContext = createContext(null);


const LoggedInProvider = ({ children }) => {  
  
  const [user, setUser] = useState(false);

  return (
    <LoggedInContext.Provider value={{ user, setUser }}>
      {children}
    </LoggedInContext.Provider>
  );
}

export default LoggedInProvider;