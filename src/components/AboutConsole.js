import React from "react"
import ReactDOM from "react-dom"

import { connect } from "react-redux"

import actions from "../redux/actions"


class AboutConsole extends React.Component {
    constructor(props) {
        super(props)
        this.editContainer = React.createRef()
        this.editor = React.createRef()
        this.caret = React.createRef()
        this.charSpacing = 11
    }

    componentDidMount() {
        this.refreshConsole({
            caretSelected: true
        })
        this.editor.current.focus()
    }

    scrollEditorToBottom() {
        let editor = ReactDOM.findDOMNode(this.editContainer.current)
        if (editor) {
            editor.scrollTop = editor.scrollHeight
        }
    }

    refreshConsole(data) {
        let { dispatch } = this.props
        dispatch(actions.saveConsoleData(data)).then(() => {
            setTimeout(this.scrollEditorToBottom.bind(this), 20)
        })
    }

    getCommandOutput(command) {

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
                        <span>Loves automation. Occasionally <a target="_blank" href="https://medium.com/bony-roopchandani">writes</a>.</span>
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
                this.refreshConsole({
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

    processCommand() {
        let command = this.props.terminal.currentTextEnterted.trim()
        let output = [`>>> ${command}`, this.getCommandOutput(command)]

        let buffer = command.toLowerCase().trim() == "clear" ? [] : this.props.terminal.buffer

        this.refreshConsole({
            buffer: buffer.concat([output]),
            currentTextEnterted: "",
            caretRightPosition: -this.charSpacing,
            lastCommand: command || this.props.terminal.lastCommand
        })
    }

    updateCaretPosition(position) {
        this.refreshConsole({
            caretRightPosition: position
        })
    }

    moveCaretRight() {
        if (this.props.terminal.caretRightPosition > -this.charSpacing) {
            this.updateCaretPosition(this.props.terminal.caretRightPosition - this.charSpacing)
        }
    }

    moveCaretLeft() {
        if (this.props.terminal.currentTextEnterted.length * this.charSpacing > this.props.terminal.caretRightPosition + this.charSpacing) {
            this.updateCaretPosition(this.props.terminal.caretRightPosition + this.charSpacing)
        }
    }

    inKey(event, character) {
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

    handleKeyPress(event) {
        if (!this.props.terminal.caretSelected) {
            return
        }
        
        switch (event.key) {
            case "Enter": {
                event.preventDefault()
                this.processCommand()
                return
            }
            case "ArrowUp": {
                let lastCommand = this.props.terminal.lastCommand

                this.refreshConsole({
                    currentTextEnterted: lastCommand
                })
                return
            }
            case "ArrowDown": {
                this.refreshConsole({
                    currentTextEnterted: ""
                })
                return
            }
            case "ArrowRight": {
                this.moveCaretRight()
                return
            }
            case "ArrowLeft": {
                this.moveCaretLeft()
                return
            }
            case "Backspace": {
                event.preventDefault()
                let previousText = this.props.terminal.currentTextEnterted
                let charFromRight = this.props.terminal.caretRightPosition / this.charSpacing + 1
                let charFromLeft = previousText.length - charFromRight - 1

                this.refreshConsole({
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

        character = this.inKey(event, character)

        if (character) {
            let previousText = this.props.terminal.currentTextEnterted
            let charFromRight = this.props.terminal.caretRightPosition / this.charSpacing + 1
            let charFromLeft = previousText.length - charFromRight

            this.refreshConsole({
                currentTextEnterted: previousText.substr(0, charFromLeft) + character + previousText.substr(charFromLeft, previousText.length)
            })
        }

        this.scrollEditorToBottom()
    }

    focusConsole(e) {
        this.editor.current.focus()
        this.refreshConsole({
            caretSelected: true
        })
    }

    blurConsole() {
        this.refreshConsole({
            caretSelected: false
        })
    }

    render() {
        let editor = this.props.terminal.buffer.map((line, index) => {
            return (
                <span key={index}>
                    {line} <br/>
                </span>
            )
        })

        let caret = this.props.terminal.caretSelected ? (
            <span ref={this.caret} className="caret">
                <span style={{ right: `${this.props.terminal.caretRightPosition}px` }} className="caret-after"/>
            </span>
        ) : null

        let currentLine = (
            <span>>>> <div
                    contentEditable={true}
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    className="edit-line"
                    type="text"
                    suppressContentEditableWarning
                    ref={this.editor}
                    onKeyDown={this.handleKeyPress.bind(this)}>
                    {this.props.terminal.currentTextEnterted} {caret}
                </div>
            </span>
        )

        return (
            <div onClick={this.focusConsole.bind(this)} onBlur={this.blurConsole.bind(this)} className="console">
                <div className="controls">
                    <div style={{ background: "rgb(252, 99, 93)" }} className="console-ctrl"></div>
                    <div style={{ background: "rgb(254, 192, 65)" }} className="console-ctrl"></div>
                    <div style={{ background: "rgb(53, 204, 75)" }} className="console-ctrl"></div>
                </div>
                <div ref={this.editContainer} className="editing">
                    {editor}
                    {currentLine}
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => state
)(AboutConsole)
