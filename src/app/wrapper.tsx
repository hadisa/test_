"use client"
import { ThemeProvider } from 'next-themes'
import React, { ReactNode } from 'react';

interface WrapperProps {
    children: ReactNode;
}

export function Wrapper(props: WrapperProps) {
    const { children } = props;
    return (
        <ThemeProvider attribute="class" defaultTheme={"light"} enableSystem>
            {children}
        </ThemeProvider>
    )
}

