import React from "react"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faFileAlt)


export default class AboutNormal extends React.Component {
    render() {
        return (
            <div className="about-normal">
                <p>Hello! <span className="wave-hand">👋</span></p>
                <p>I'm <span className="bold">Bony Roopchandani</span>, a full-stack developer by profession who loves to code and build experiences.</p>
                {/* <p className="resume"><FontAwesomeIcon icon="file-alt" /> Resume</p> */}
            </div>
        )
    }
}
