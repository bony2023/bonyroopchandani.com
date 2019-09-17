import React from "react"


export default function Header(props) {
    let navigation = props.navItems.map((navItem, index) => {
        return (
            <li key={index}>
                <a {...navItem}>{navItem.label}</a>
            </li>
        )
    })
    return (
        <header>
            <div>
                <a href="/"></a>
            </div>
            <ul>
                {navigation}
            </ul>
        </header>
    )
}

Header.defaultProps = {
    navItems: [{
        label: "Work",
        href: "#work"
    }, {
        label: "Blog",
        href: "https://medium.com/@bonyroopchandani",
        target: "_blank"
    }, {
        label: "Resume",
        href: "public/static/resume.pdf",
        target: "_blank"
    }]
}
