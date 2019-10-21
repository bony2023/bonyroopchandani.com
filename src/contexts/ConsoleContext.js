import React, { createContext, useState } from "react"

export const ConsoleContext = createContext()

export const ConsoleContextProvider = (props) => {
    const [consoleData, setConsoleData] = useState({
        caretRightPosition: -11,
        caretSelected: true,
        currentTextEnterted: "",
        lastCommand: "",
        buffer: [
            "Type \"help(bony)\" for more information.",
            ">>> import bony"
        ]
    })

    function setConsoleDataAction(data) {
        setConsoleData(Object.assign({}, consoleData, data))
    }

    return (
        <ConsoleContext.Provider value={[consoleData, setConsoleDataAction]}>
            {props.children}
        </ConsoleContext.Provider>
    )
}

export default {
    ConsoleContext,
    ConsoleContextProvider
}