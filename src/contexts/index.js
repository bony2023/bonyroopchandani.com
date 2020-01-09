import React from "react"
import { ThemeContextProvider } from "./ThemeContext"
import { TerminalContextProvider } from "react-terminal"

export default function ContextProvider(props) {
    return (
        <ThemeContextProvider>
            <TerminalContextProvider>
                {props.children}
            </TerminalContextProvider>
        </ThemeContextProvider>
    )
}