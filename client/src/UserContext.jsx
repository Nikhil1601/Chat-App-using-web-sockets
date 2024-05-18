import { createContext, useState } from "react";

export const userContext = createContext({});


export function UserContextProvider({children}){
    const {username,setusername} = useState(null);
    const {id,setid} = useState(null);

    return(
        <userContext.Provider value={{username,setusername,id,setid}}>{children}</userContext.Provider>
    );
}