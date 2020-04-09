import React from "react"
import Switch from "./Switch"


export default function Header(props) {
    let navigation = props.navItems.map((navItem, index) => {
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
        label: "Blog",
        href: "https://medium.com/@bonyroopchandani",
        target: "_blank",
        rel: "noreferrer"
    }, {
        label: "Resume",
        href: "public/static/resume.pdf",
        target: "_blank",
        rel: "noreferrer"
    }]
}
