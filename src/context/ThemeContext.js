import React, { createContext, useState, useCallback, useEffect } from "react"

export const ThemeContext = createContext()

export const ThemeContextProvider = (props) => {
    const [theme, setTheme] = useState("default")
    const handThemeChange = useCallback(({ matches }) => {
        setActiveTheme(matches)
    }, [])

    useEffect(() => {
        const isDarkModeEnabled = window.matchMedia("(prefers-color-scheme: dark)").matches
        setActiveTheme(isDarkModeEnabled)
    }, [])

    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)').addListener(handThemeChange)
        return () => {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener(handThemeChange)
        }
    }, [handThemeChange]);

    function setActiveTheme(isDarkModeEnabled) {
        setTheme(isDarkModeEnabled ? "dark" : "default")
    }

    return (
        <ThemeContext.Provider value={theme}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default {
    ThemeContext,
    ThemeContextProvider
}