// UserContext.js
import React, { createContext, useContext, useState } from "react";

//create a new context
const UserContext = createContext();

//A custom hook that simplifies the usage of our UserContext
//useContext allows functional components to access context values
const useUserContext = () => useContext(UserContext);

//Anyone in my part of the app can share and access the user information
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  return (
    //Any component wrapped by UserContext.Provider can access the context value
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
