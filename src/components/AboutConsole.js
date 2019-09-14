import React, { useContext, useEffect } from "react"
import ReactDOM from "react-dom"

import { ConsoleContext } from "../context/ConsoleContext"

export default function AboutConsole(props) {
    const [consoleData, setConsoleData] = useContext(ConsoleContext)
    const editorRef = React.createRef()
    const editContainerRef = React.createRef()
    const caretRef = React.createRef()
    const charSpacing = 11

    useEffect(() => {
        editorRef.current.focus()
        setConsoleData({ caretSelected: true })
    }, [])

    useEffect(() => {
        setTimeout(scrollEditorToBottom(), 20)
    }, [consoleData])

    function handleKeyPress(event) {
        if (!consoleData.caretSelected) {
            return
        }
        
        switch (event.key) {
            case "Enter": {
                event.preventDefault()
                processCommand()
                return
            }
            case "ArrowUp": {
                let lastCommand = consoleData.lastCommand

                setConsoleData({
                    currentTextEnterted: lastCommand
                })
                return
            }
            case "ArrowDown": {
                setConsoleData({
                    currentTextEnterted: ""
                })
                return
            }
            case "ArrowRight": {
                moveCaretRight()
                return
            }
            case "ArrowLeft": {
                moveCaretLeft()
                return
            }
            case "Backspace": {
                event.preventDefault()
                let previousText = consoleData.currentTextEnterted
                let charFromRight = consoleData.caretRightPosition / charSpacing + 1
                let charFromLeft = previousText.length - charFromRight - 1

                setConsoleData({
                    currentTextEnterted: previousText.substr(0, charFromLeft) + previousText.substr(charFromLeft + 1, previousText.length)
                })
                return
            }
        }

        event.preventDefault()

        let character = String.fromCharCode(event.which).toLowerCase()
        let shiftMapping = {
            "0": ")",
            "9": "(",
        }

        if (event.shiftKey) {
            if ("09".indexOf(character) !== -1) {
                character = shiftMapping[character]
            } else {
                return
            }
        }

        character = inKey(event, character)

        if (character) {
            let previousText = consoleData.currentTextEnterted
            let charFromRight = consoleData.caretRightPosition / charSpacing + 1
            let charFromLeft = previousText.length - charFromRight

            setConsoleData({
                currentTextEnterted: previousText.substr(0, charFromLeft) + character + previousText.substr(charFromLeft, previousText.length)
            })
        }

        scrollEditorToBottom()
    }

    function focusConsole(e) {
        editorRef.current.focus()
        setConsoleData({
            caretSelected: true
        })
    }

    function blurConsole() {
        setConsoleData({
            caretSelected: false
        })
    }

    function scrollEditorToBottom() {
        let editor = ReactDOM.findDOMNode(editContainerRef.current)
        if (editor) {
            editor.scrollTop = editor.scrollHeight
        }
    }

    function inKey(event, character) {
        if (character >= "a" && character <= "z") {
            return character
        }

        if ("0123456789".indexOf(character) !== -1) {
            return character
        }

        if (")(".indexOf(character) !== -1) {
            return character
        }

        if (".".indexOf(event.key) !== -1) {
            return event.key
        }

        return null
    }

    function processCommand() {
        let command = consoleData.currentTextEnterted.trim()
        let output = [`>>> ${command}`, getCommandOutput(command)]

        let buffer = command.toLowerCase().trim() == "clear" ? [] : consoleData.buffer

        setConsoleData({
            buffer: buffer.concat([output]),
            currentTextEnterted: "",
            caretRightPosition: -charSpacing,
            lastCommand: command || consoleData.lastCommand
        })
    }

    function getCommandOutput(command) {

        switch (command.toLowerCase().trim()) {
            case "": {
                return ""
            }
            case "help(bony)": {
                return (
                    <span key={-1}>
                        <br/><span>Available commands:</span><br/>
                        <span style={{ marginLeft: "20px" }}>bony.about -- shows more information about the person</span><br/>
                        <span style={{ marginLeft: "20px" }}>bony.resume -- link to the resume</span><br/>
                        <span style={{ marginLeft: "20px" }}>bony.experience -- total number of working experience</span><br/>
                        <span style={{ marginLeft: "20px" }}>clear -- clears the console</span>
                    </span>
                )
            }
            case "bony": {
                let output = `<module 'bony' from '${location.hostname}.pyc'>`
                return (
                    <span key={-1}>
                        <br/><span>
                            {output}
                        </span>
                    </span>
                )
            }
            case "bony.about": {
                return (
                    <span key={-1}>
                        <br/><span>A full-stack developer by profession who loves to code and build experiences.</span><br/>
                        <span>Completed bachelors in Computer Science and have never looked back since then.</span><br/>
                        <span>Loves automation. Occasionally <a target="_blank" href="https://medium.com/@bonyroopchandani">writes</a>.</span>
                    </span>
                )
            }
            case "bony.resume": {
                return (
                    <span key={-1}>
                        <br/><a target="_blank" href="public/static/resume.pdf">resume.pdf</a>
                    </span>
                )
            }
            case "bony.experience": {
                let experience = ((new Date() - new Date("2016-02-01")) / 1000 / 60 / 60 / 24 / 365).toFixed(1)
                return (
                    <span key={-1}>
                        <br/>{experience} years
                    </span>
                )
            }
            case "clear": {
                setConsoleData({
                    buffer: []
                })
                return
            }
            default: {
                return (
                    <span key={-1}>
                        <br/><span>not defined!</span>
                    </span>
                )
            }
        }
    }

    function updateCaretPosition(position) {
        setConsoleData({
            caretRightPosition: position
        })
    }

    function moveCaretRight() {
        if (consoleData.caretRightPosition > -charSpacing) {
            updateCaretPosition(consoleData.caretRightPosition - charSpacing)
        }
    }

    function moveCaretLeft() {
        if (consoleData.currentTextEnterted.length * charSpacing > consoleData.caretRightPosition + charSpacing) {
            updateCaretPosition(consoleData.caretRightPosition + charSpacing)
        }
    }

    const editor = consoleData.buffer.map((line, index) => {
        return (
            <span key={index}>
                {line} <br/>
            </span>
        )
    })

    const caret = consoleData.caretSelected ? (
        <span ref={caretRef} className="caret">
            <span style={{ right: `${consoleData.caretRightPosition}px` }} className="caret-after"/>
        </span>
    ) : null

    const currentLine = (
        <span>>>> <div
                contentEditable={true}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                className="edit-line"
                type="text"
                suppressContentEditableWarning
                ref={editorRef}
                onKeyDown={handleKeyPress}>
                {consoleData.currentTextEnterted} {caret}
            </div>
        </span>
    )

    return (
        <div onClick={focusConsole} onBlur={blurConsole} className="console">
            <div className="controls">
                <div style={{ background: "rgb(252, 99, 93)" }} className="console-ctrl"></div>
                <div style={{ background: "rgb(254, 192, 65)" }} className="console-ctrl"></div>
                <div style={{ background: "rgb(53, 204, 75)" }} className="console-ctrl"></div>
            </div>
            <div ref={editContainerRef} className="editing">
                {editor}
                {currentLine}
            </div>
        </div>
    )
}