"use client"
import { ThemeProvider } from 'next-themes'
import React from 'react';

interface WrapperProps {
    children: React.ReactNode;
}

export function Wrapper({ children }: WrapperProps) {
    return (
        <ThemeProvider attribute="class" defaultTheme={"light"} enableSystem>
            {children}
        </ThemeProvider>
    )
}

