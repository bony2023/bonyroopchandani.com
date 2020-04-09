import React, { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"

import { ReactTerminal } from "react-terminal"


export default function AboutConsole(props) {
    const theme = useContext(ThemeContext)

    const welcomeMessage = (
        <span>
            Type "help(bony)" for more information. <br />
        </span>
    )

    const commands = {
        "help(bony)": (
            <span>
                <span>Available commands:</span><br/>
                <span style={{ marginLeft: "20px" }}>bony.about -- know more about me</span><br/>
                <span style={{ marginLeft: "20px" }}>bony.resume -- want to have a look at my resume?</span><br/>
                <span style={{ marginLeft: "20px" }}>bony.experience -- total years of working experience</span>
            </span>
        ),

        "bony.about": (
            <span>
                <span>A full-stack developer by profession who loves to code and build experiences.</span><br/>
                <span>Completed bachelors in Computer Science and have never looked back since then.</span><br/>
                <span>Loves automation. Occasionally <a target="_blank" href="https://medium.com/@bonyroopchandani">writes</a>.</span>
            </span>
        ),

        "bony.resume": (
            <span>
                <a target="_blank" aria-label="Resume" rel="noreferrer" href="public/static/resume.pdf">resume.pdf</a>
            </span>
        ),

        "bony.experience": () => {
            const experience = ((new Date() - new Date("2016-02-01")) / 1000 / 60 / 60 / 24 / 365).toFixed(1)
            return `${experience} years`
        }
    }

    return (
        <div className="console">
            <ReactTerminal
                theme={theme == "dark" ? "dark" : "light"}
                welcomeMessage={welcomeMessage}
                commands={commands}
            />
        </div>
    )
}
