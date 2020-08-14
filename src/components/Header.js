import React, { useContext } from "react"
import { ResumeContext } from "../contexts/ResumeContext"


export default function Header(props) {
    const resumeUrl = useContext(ResumeContext)
    const navigation = props.navItems.map((navItem, index) => {
        if (navItem.label === "Resume") {
            navItem.href = resumeUrl
        }

        return (
            <li key={index}>
                <a {...navItem} aria-label={navItem.label}>{navItem.label}</a>
            </li>
        )
    })

    return (
        <header>
            <div className="nav-index">
                <a href="/" aria-label="Home"></a>
            </div>
            <ul>
                {navigation}
            </ul>
        </header>
    )
}

Header.defaultProps = {
    navItems: [{
        label: "Exp",
        href: "#experience"
    }, {
        label: "Work",
        href: "#work"
    }, {
        label: "Resume",
        href: "",  // populate dynamically
        target: "_blank",
        rel: "noreferrer"
    }, {
        label: "Blog",
        href: "https://medium.com/@bonyroopchandani",
        target: "_blank",
        rel: "noreferrer"
    }]
}
