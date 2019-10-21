import React from "react"
import { ThemeContextProvider } from "./ThemeContext"
import { ConsoleContextProvider } from "./ConsoleContext"

export default function ContextProvider(props) {
    return (
        <ThemeContextProvider>
            <ConsoleContextProvider>
                {props.children}
            </ConsoleContextProvider>
        </ThemeContextProvider>
    )
}