import React, { createContext, useState, useEffect } from "react"

export const ResumeContext = createContext()

export const ResumeContextProvider = (props) => {
    const [resumeUrl, setResumeUrl] = useState("")

    const constructResumeUrl = async (url) => {
        const sha = await fetch(url)
            .then(response => response.json())
            .then(data => data.sha)
        setResumeUrl(`https://cdn.statically.io/gh/bony2023/resume/${sha}/resume.pdf`)
    }

    useEffect(() => {
        constructResumeUrl('https://api.github.com/repos/bony2023/resume/commits/master')
    }, [])

    return (
        <ResumeContext.Provider value={resumeUrl}>
            {props.children}
        </ResumeContext.Provider>
    )
}

export default {
    ResumeContext,
    ResumeContextProvider
}