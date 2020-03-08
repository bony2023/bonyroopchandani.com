import React from "react"

import Swiper from 'react-id-swiper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

import reactTerminal from "../../public/images/react-terminal.jpg"
import yazlo from "../../public/images/yazlo.svg"
import tutoschedule from "../../public/images/tutoschedule.svg"
import chatio from "../../public/images/chatio.svg"
import bettinza from "../../public/images/bettinza.svg"
import git from "../../public/images/git.svg"


export default function Work(props) {
    let myWork = props.myWork.map((work, index) => {
        return (
            <div key={index} className="portfolio-box">
                <a target="_blank" href={work.link}><img src={work.banner}/></a>
                <div className="project-content">
                    <span className="project-title lg-text">
                        {work.title}
                        <a target="_blank" href={work.link}><FontAwesomeIcon className="project-link" icon={faExternalLinkAlt}/></a>
                    </span>
                    <p className="project-description">{work.description}</p>
                </div>
            </div>
        )
    })

    return (
        <div id="work">
            <div className="head">My Work</div>
            <div className="content">
                <Swiper {...props.swiperParams}>
                    {myWork}
                </Swiper>
            </div>
        </div>
    )
}

Work.defaultProps = {
    myWork: [{
        title: "Yazlo",
        banner: yazlo,
        link: "https://yazlo.herokuapp.com/",
        description: "A Database Storage Platform for managing/accessing databases through REST API, developed in Django."
    }, {
        title: "React Terminal",
        banner: reactTerminal,
        link: "https://www.npmjs.com/package/react-terminal/",
        description: "🚀 React component that renders a static Terminal 🖥"
    }, {
        title: "Bettinza",
        banner: bettinza,
        link: "https://bettinza.herokuapp.com/",
        description: "A simple betting game, built using HTML5 Canvas and ReactJS."
    }, {
        title: "TutoSchedule",
        banner: tutoschedule,
        link: "http://tutoschedule.herokuapp.com/",
        description: "This web application can be used by a tutor for scheduling classes on his / her Google Calendar by sharing scheduling link to students."
    }, {
        title: "ChatIO",
        banner: chatio,
        link: "http://flasksocketiochat.herokuapp.com/",
        description: "A chatting web application developed on Flask and SocketIO provides group and anonymous chat."
    }, {
        title: "More on Git",
        banner: git,
        link: "https://github.com/bony2023/"
    }],
    swiperParams: {
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: true
        },
    }
}
