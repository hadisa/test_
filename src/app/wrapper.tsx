'use client'
import { ThemeProvider } from 'next-themes'
import React, { ReactNode } from 'react'

export function Wrapper(props: { children: ReactNode }) {
    const { children } = props;
    return (
        <ThemeProvider attribute="class" defaultTheme={"light"} enableSystem>
            {children}
        </ThemeProvider>
    )
}
