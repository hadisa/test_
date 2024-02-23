"use client"
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react' // Import ReactNode as type
import React from 'react'

export function Wrapper(props: { children: ReactNode }) {
    const { children } = props;
    return (
        <ThemeProvider attribute="class" defaultTheme={"light"} enableSystem>
            {children}
        </ThemeProvider>
    )
}
