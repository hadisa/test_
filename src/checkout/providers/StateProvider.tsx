"use client"

import React, { createContext, useContext, useState } from "react";

export const Context: any = createContext(null); // Named export

export const StateProvider = ({ children }: any) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    return (
        <Context.Provider
            value={{
                isDarkTheme, setIsDarkTheme
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useStateProvider = () => useContext(Context);

