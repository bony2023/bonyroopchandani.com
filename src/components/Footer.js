import React from "react"


export default class Footer extends React.Component {

    render() {
        let contactLinks = this.props.contactLinks.map((contactLink, index) => {
            return (
                <li key={index}>
                    <a target="_blank" href={contactLink.link}>{contactLink.label}</a>
                </li>
            )
        })

        return (
            <footer>
                <ul>
                    {contactLinks}
                </ul>
            </footer>
        )
    }
}

Footer.defaultProps = {
    contactLinks: [{
        "label": "Email",
        "link": "mailto:bonyroopchandani@gmail.com"
    }, {
        "label": "GitHub",
        "link": "https://github.com/bony2023/"
    }, {
        "label": "LinkedIn",
        "link": "https://www.linkedin.com/in/bony2023/"
    }, {
        "label": "Twitter",
        "link": "https://twitter.com/bony2023/"
    }]
}
