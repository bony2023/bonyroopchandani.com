import React from "react"

import Swiper from 'react-id-swiper'

import yazlo from "../../public/images/yazlo.svg"
import tutoschedule from "../../public/images/tutoschedule.svg"
import chatio from "../../public/images/chatio.svg"
import ibackup from "../../public/images/ibackup.svg"
import bettinza from "../../public/images/bettinza.svg"
import git from "../../public/images/git.svg"


export default class Work extends React.Component {
    constructor(props) {
        super(props)
        this.swiperParams = {
            effect: 'coverflow',
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
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: true
            },
        }
    }
    render() {
        let myWork = this.props.myWork.map((work, index) => {
            return (
                <div key={index} className="portfolio-box">
                    <a target="_blank" href={work.link}><img src={work.banner}/></a>
                    <p>
                        <span className="project-title">{work.title}</span>
                        <span>{work.description}</span>
                    </p>
                </div>
            )
        })

        return (
            <div id="work">
                <div className="head">My Work</div>
                <div className="content">
                    <Swiper {...this.swiperParams}>
                        {myWork}
                    </Swiper>
                </div>
            </div>
        )
    }
}

Work.defaultProps = {
    myWork: [{
        title: "Yazlo",
        banner: yazlo,
        link: "https://yazlo.herokuapp.com/",
        description: "A Database Storage Platform for managing / accessing databases through REST API, developed in Django."
    }, {
        title: "Bettinza",
        banner: bettinza,
        link: "https://bettinza.herokuapp.com/",
        description: "Simple betting game, built using HTML5 Canvas and ReactJS."
    }, {
        title: "TutoSchedule",
        banner: tutoschedule,
        link: "http://tutoschedule.herokuapp.com/",
        description: "This web application can be used by a tutor for scheduling classes on his / her Google Calendar by sharing scheduling link to students."
    }, {
        title: "ChatIO",
        banner: chatio,
        link: "http://flasksocketiochat.herokuapp.com/",
        description: "A chatting web application developed on Flask and SocketIO, provides group and anonymous chat."
    }, {
        title: "iBackup",
        banner: ibackup,
        link: "http://ibackup.herokuapp.com/",
        description: "A small and simple application that backups Instagram’s data of a user by accessing Instagram’s REST API"
    }, {
        title: "More on Git",
        banner: git,
        link: "https://github.com/bony2023/",
        description: ""
    }]
}