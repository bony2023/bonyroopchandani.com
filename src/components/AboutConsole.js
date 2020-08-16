import React, { useContext } from "react"
import Tracks from "./Tracks";
import { ThemeContext } from "../contexts/ThemeContext"
import { ResumeContext } from "../contexts/ResumeContext"
import Utils from "../common/Utils"

import { ReactTerminal } from "react-terminal"


export default function AboutConsole(props) {
    const { theme, setTheme } = useContext(ThemeContext)
    const resumeUrl = useContext(ResumeContext)

    const welcomeMessage = (
        <span>
            Type "help(bony)" for more information. <br />
        </span>
    )

    const commands = {
        "help(bony)": (
            <span>
                <span>Help on module bony:</span><br/><br/>

                <span>VARIABLES</span><br/>
                <span style={{ marginLeft: "20px" }}><strong>bony.about</strong> -- know more about me</span><br/>
                <span style={{ marginLeft: "20px" }}><strong>bony.resume</strong> -- want to have a look at my resume?</span><br/><br/>

                <span>FUNCTIONS</span><br/>
                <span style={{ marginLeft: "20px" }}><strong>bony.experience()</strong> -> float</span><br/>
                <span style={{ marginLeft: "40px" }}>returns the total years of working experience</span><br/>
                <span style={{ marginLeft: "20px" }}><strong>bony.toggle_theme()</strong> -> None</span><br/>
                <span style={{ marginLeft: "40px" }}>toggle the website's theme</span><br/>
                <span style={{ marginLeft: "20px" }}><strong>bony.audio()</strong> -> Tracks[]</span><br/>
                <span style={{ marginLeft: "40px" }}>check my playlist on spotify</span>
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
                <a target="_blank" aria-label="Resume" rel="noreferrer" href={resumeUrl}>resume.pdf</a>
            </span>
        ),

        "bony.experience()": () => {
            const experience = ((new Date() - new Date("2016-02-01")) / 1000 / 60 / 60 / 24 / 365).toFixed(1)
            return `${experience} years`
        },

        "bony.toggle_theme()": () => setTheme(theme === "dark" ? "default" : "dark"),

        "bony.audio()": async () => {
            const playlistData = await Utils.getPlaylistData()
            return <Tracks playlistId={playlistData.playlistId} tracks={playlistData.tracks}/>
        }
    }

    return (
        <div className="console">
            <ReactTerminal
                theme={theme == "dark" ? "dracula" : "light"}
                welcomeMessage={welcomeMessage}
                commands={commands}
            />
        </div>
    )
}
