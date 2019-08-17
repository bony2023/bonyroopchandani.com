import React from "react"

import Console from "./Console"
import AboutNormal from "./AboutNormal"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faQuestion, faTerminal } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


library.add(faQuestion)
library.add(faTerminal)


export default class About extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isTerminalSelected: false,
            isSmallScreen: false
        }
    }

    initializeState() {
        this.setState((prevState) => {
            return {
                isTerminalSelected: !prevState.isTerminalSelected ? false : window.outerWidth > 800,
                isSmallScreen: window.outerWidth <= 800
            }
        });
    }

    componentDidMount() {
        this.initializeState()

        window.addEventListener('resize', () => {
            this.initializeState()
        }, false);
    }

    componentWillUnmount() {
        window.removeEventListener('resize')
    }

    selectNormal() {
        this.setState({
            isTerminalSelected: false
        })
    }

    selectTerminal() {
        this.setState({
            isTerminalSelected: true
        })
    }

    render() {
        let icon = this.state.isTerminalSelected ? (
            <FontAwesomeIcon onClick={this.selectNormal.bind(this)} className="normal" icon="question" />
        ) : (
            <FontAwesomeIcon onClick={this.selectTerminal.bind(this)} className="terminal" icon="terminal" />
        )

        if (this.state.isSmallScreen) {
            icon = null
        }
        
        let content = this.state.isTerminalSelected ? <Console/> : <AboutNormal/>

        return (
            <div id="about">
                {content}
                {icon}
            </div>
        )
    }
}
