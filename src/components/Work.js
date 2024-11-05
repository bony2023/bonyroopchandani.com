import React, { useState } from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import reactTerminal from "../../public/images/react-terminal.svg"
import yazlo from "../../public/images/yazlo.svg"
import tutoschedule from "../../public/images/tutoschedule.svg"
import chatio from "../../public/images/chatio.svg"
import bettinza from "../../public/images/bettinza.svg"
import soundcloudDownloader from "../../public/images/soundcloud-downloader.svg"
import ibackup from "../../public/images/ibackup.svg"


export default function Work(props) {
  const [projectSelectedIndex, setProjectSelectedIndex] = useState(0)

  const projects = props.projects.map((project, index) => {
    return (
      <li
        key={index}
        className={index == projectSelectedIndex ? "active" : ""}
        onClick={() => setProjectSelectedIndex(index)}>
          <span className="project-title">{project.title}</span>
      </li>
    )
  })

  const projectDetails = props.projects[projectSelectedIndex]

  const projectLinks = Object.keys(projectDetails.links).map(linkName => {
    return (
      <a
        key={linkName}
        index={linkName}
        target="_blank"
        rel="noreferrer"
        aria-label={projectDetails.title}
        href={projectDetails.links[linkName]}>
          <FontAwesomeIcon className="project-link-icon" icon={props.iconMapping[linkName]}/>
      </a>
    )
  })

  return (
    <div id="work">
      <div className="head">My Work</div>
      <div className="content">
        <div className="project-name-list">
          <ul>
            {projects}
          </ul>
        </div>
        <div className="project-details">
          <p className="project-logo"><img alt={projectDetails.title} src={projectDetails.logo}/></p>
          <span className="bold lg-text project-title-desc">{projectDetails.title}</span>
          <p className="project-description">{projectDetails.description}</p>
          <p className="project-links">{projectLinks}</p>
        </div>
      </div>
    </div>
  )
}

Work.defaultProps = {
  iconMapping: {
    app: faLink,
    github: faGithub
  },

  projects: [{
      title: "React Terminal",
      logo: reactTerminal,
      links: {
        app: "https://www.npmjs.com/package/react-terminal/",
        github: "https://github.com/bony2023/react-terminal/",
      },
      icon: "icon-terminal",
      description: "🚀 React component that renders a static Terminal 🖥",
      skills: ["ReactJS (JavaScript)"]
  }, {
    title: "Yazlo",
    logo: yazlo,
    links: {
      app: "https://yazlo.herokuapp.com/",
      github: "https://github.com/bony2023/yazlo-api/",
    },
    icon: "icon-yazlo",
    description: "A Database Storage Platform for managing/accessing databases through REST API, developed in Django.",
    skills: ["Django (Python)", "JavaScript", "MongoDB"]
  }, {
      title: "Bettinza",
      links: {
        app: "https://bettinza.herokuapp.com/",
      },
      logo: bettinza,
      icon: "icon-bettinza",
      description: "A betting game, built using HTML5 Canvas, Spring Java and ReactJS.",
      skills: ["HTML5 Canvas", "Spring (Java)", "ReactJS (JavaScript)"]
  }, {
      title: "TutoSchedule",
      logo: tutoschedule,
      links: {
        app: "http://tutoschedule.herokuapp.com/",
      },
      icon: "icon-tutoschedule",
      description: "This web application can be used by a tutor for scheduling classes on his / her Google Calendar by sharing scheduling link to students.",
      skills: ["ReactJS (JavaScript)", "Ruby on Rails"]
  }, {
      title: "ChatIO",
      logo: chatio,
      links: {
        app: "http://flasksocketiochat.herokuapp.com/",
        github: "https://github.com/bony2023/Flask-Chat-Application/",
      },
      icon: "icon-chatio",
      description: "A chatting web application developed on Flask and SocketIO provides group and anonymous chat.",
      skills: ["Flask (Python)", "JavaScript", "SocketIO"]
  }, {
    title: "SoundCloud Downloader",
    logo: soundcloudDownloader,
    links: {
      github: "https://github.com/bony2023/SoundCloud-Downloader/",
    },
    icon: "icon-soundcloud-downloader",
    description: "Written in Python, this script supports downloading tracks/playlists from Soundcloud using public links.",
    skills: ["Python"]
  }, {
    title: "Instagram Backup",
    logo: ibackup,
    links: {
      app: "http://ibackup.herokuapp.com/",
      github: "https://github.com/bony2023/Instagram-Backup/",
    },
    icon: "icon-ibackup",
    description: "Download the full media archive of individual's instagram account.",
    skills: ["PHP", "JavaScript"]
  }]
}