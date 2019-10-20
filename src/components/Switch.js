import React from "react"


export default function Switch(props) {
    return (
        <div id="switch">
            <input className="switch-toggle" id="switch-checkbox" type="checkbox"/>
            <label className="switch-btn" htmlFor="switch-checkbox"></label>
        </div>
    )
}