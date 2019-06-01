import React from "react"

import About from "./About"
import Experience from "./Experience"
import Work from "./Work"


export default class Content extends React.Component {
    render() {
        return (
            <div>
                <About/>
                <Experience/>
                <Work/>
            </div>
        )
    }
}
