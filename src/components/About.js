import React, { useState, useCallback, useEffect, } from "react"

import AboutNormal from "./AboutNormal"
import AboutConsole from "./AboutConsole"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faTerminal } from '@fortawesome/free-solid-svg-icons'


export default function About(props) {
    const [isTerminalSelected, setIsTerminalSelected] = useState(false)
    const [isSmallScreen, setIsSmallScreen] = useState(true)
    const [iconAnimationPlayState, setIconAnimationPlayState] = useState("running")

    useEffect(() => {
        initializeState()
        return () => {
            window.removeEventListener('resize')
        }
    }, [])

    function initializeState() {
        window.addEventListener('resize', initializeState, false)
        setIsTerminalSelected(isTerminalSelected => !isTerminalSelected ? false : window.outerWidth > 800)
        setIsSmallScreen(window.outerWidth <= 800)
    }

    let icon = isTerminalSelected ? (
        <FontAwesomeIcon onClick={() => {
            setIsTerminalSelected(false)
            setIconAnimationPlayState("paused")
        }} className={`normal ${iconAnimationPlayState}`} icon={faQuestion} />
    ) : (
        <FontAwesomeIcon onClick={() => {
            setIsTerminalSelected(true)
            setIconAnimationPlayState("paused")
        }} className={`terminal ${iconAnimationPlayState}`} icon={faTerminal} />
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
