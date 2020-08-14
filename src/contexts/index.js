import React from "react"
import { ThemeContextProvider } from "./ThemeContext"
import { ResumeContextProvider } from "./ResumeContext"
import { TerminalContextProvider } from "react-terminal"

export default function ContextProvider(props) {
    return (
        <ThemeContextProvider>
            <ResumeContextProvider>
                <TerminalContextProvider>
                    {props.children}
                </TerminalContextProvider>
            </ResumeContextProvider>
        </ThemeContextProvider>
    )
}