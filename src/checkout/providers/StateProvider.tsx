"use client"

import React, { createContext, useContext, useState, ReactNode } from "react";

type State = {
    isDarkTheme: boolean;
    setIsDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultValue: State = {
    isDarkTheme: false,
    setIsDarkTheme: () => { } // A default setter function
};

export const Context = createContext<State>(defaultValue);

export const StateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    return (
        <Context.Provider
            value={{
                isDarkTheme,
                setIsDarkTheme
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useStateProvider = () => useContext(Context);


