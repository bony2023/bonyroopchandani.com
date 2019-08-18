import React from "react"


export default class Header extends React.Component {

    render () {
        let navigation = this.props.navItems.map((navItem, index) => {
            return (
                <li key={index}>
                    <a href={navItem.link}>{navItem.label}</a>
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
}

Header.defaultProps = {
    navItems: [{
        "label": "Exp",
        "link": "#experience"
    }, {
        "label": "Work",
        "link": "#work"
    }, {
        "label": "Resume",
        "link": "public/static/resume.pdf"
    }]
}
