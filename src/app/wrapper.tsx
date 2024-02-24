"use client"
import { ThemeProvider } from 'next-themes';

export function Wrapper(props: { children: any }) {
    const { children } = props;
    return (
        <ThemeProvider attribute="class" defaultTheme={"light"} enableSystem>
            {children}
        </ThemeProvider>
    )
}
