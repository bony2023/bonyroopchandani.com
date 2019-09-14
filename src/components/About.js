import React, { useState, useCallback, useEffect, } from "react"

import AboutNormal from "./AboutNormal"
import AboutConsole from "./AboutConsole"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faTerminal } from '@fortawesome/free-solid-svg-icons'


export default function About(props) {
    const [isTerminalSelected, setIsTerminalSelected] = useState(false)
    const [isSmallScreen, setIsSmallScreen] = useState(false)
    const handWindowResize = useCallback(initializeState, [])

    useEffect(() => {
        initializeState()
    }, [])

    useEffect(() => {
        window.addEventListener('resize', handWindowResize, false)
        return () => {
            window.removeEventListener('resize')
        }
    }, [handWindowResize]);

    function initializeState() {
        setIsTerminalSelected(!isTerminalSelected ? false : window.outerWidth > 800)
        setIsSmallScreen(window.outerWidth <= 800)
    }

    let icon = isTerminalSelected ? (
        <FontAwesomeIcon onClick={() => setIsTerminalSelected(false)} className="normal" icon={faQuestion} />
    ) : (
        <FontAwesomeIcon onClick={() => setIsTerminalSelected(true)} className="terminal" icon={faTerminal} />
    )

    if (isSmallScreen) {
        icon = null
    }
    
    const content = !isTerminalSelected ? <AboutNormal/> : <AboutConsole/>

    return (
        <div id="about">
            {content}
            {icon}
        </div>
    )
}
