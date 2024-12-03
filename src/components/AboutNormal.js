import React from "react"


export default function AboutNormal(props) {
    const experience = Math.floor((new Date() - new Date("2016-02-01")) / 1000 / 60 / 60 / 24 / 365)
    return (
        <div className="about-normal">
            <p>Hello! <span className="wave-hand">👋</span></p>
            <p>I'm a <span className="highlight">software engineer</span> with {experience} years of experience building scalable and impactful software applications.</p>
        </div>
    )
}
