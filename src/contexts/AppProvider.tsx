import React, { FC, ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";

type ProviderProps = {
    children: ReactNode;
};
const AppProvider: FC<ProviderProps> = async ({ children }) => {

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    );
};

export default AppProvider;
