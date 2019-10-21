import React, { createContext, useState, useCallback, useEffect } from "react"

export const ThemeContext = createContext()

export const ThemeContextProvider = (props) => {
    const [theme, setTheme] = useState(!window.matchMedia("(prefers-color-scheme: dark)").matches ? "default" : "dark")
    const handThemeChange = useCallback(({ matches }) => {
        setActiveTheme(matches)
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