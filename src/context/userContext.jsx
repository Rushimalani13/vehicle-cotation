"use client";
import { createContext } from "react";
import React,{ useState } from 'react';


const TodoContext = createContext();

const TodoProvider = ({children}) => {    
    const [userState, setUserState] = useState({});

    const allprops={userState, setUserState}; // Updated value prop

    return (
        <TodoContext.Provider value={allprops}>
            {children}
        </TodoContext.Provider>
    )
}


export {TodoContext,TodoProvider};