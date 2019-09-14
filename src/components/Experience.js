import React from "react"

import hiver from "../../public/images/hiver.png"
import datalicious from "../../public/images/datalicious.png"
import loktra from "../../public/images/loktra.png"
import appperfect from "../../public/images/appperfect.png"


export default function Experience(props) {
    let workExperience = props.workExperience.map((experience, index) => {
        let skills = experience.skills.map((skill, index) => {
            return <span key={index}>{skill}</span>
        })
        return (
            <div key={index}>
                <div className="exp-head">
                    <div>
                        <a target="_blank" href={experience.website}><img src={experience.logo}/></a>
                        <span className="bold lg-text">{experience.companyName}</span>
                        <span style={{float: "right"}} className="exp-det italic">{experience.duration}</span>
                    </div>
                    <div>
                        <span className="bold">{experience.position}</span>
                        <span style={{float: "right"}} className="exp-det italic">{experience.location}</span>
                    </div>
                </div>
                <div className="exp-work">
                    {experience.work}
                </div>
                <div className="skills">
                    {skills}
                </div>
            </div>
        )
    })

    return (
        <div id="experience">
            <div className="head">Experience</div>
            <div className="content">
                {workExperience}
            </div>
        </div>
    )
}

Experience.defaultProps = {
    workExperience: [{
        companyName: "Hiver",
        logo: hiver,
        website: "https://hiverhq.com/",
        position: "Senior Software Engineer",
        work: "Hiver is a shared mailbox management over Gmail. Working on building the infrastructure on the backend as well as architecting and incorporating features.",
        skills: ["Python", "MySQL"],
        duration: "May 2019 - Present",
        location: "Bengaluru, India"
    },{
        companyName: "Datalicious",
        logo: datalicious,
        website: "https://www.datalicious.com/",
        position: "Full Stack Developer",
        work: "Working on a marketing attribution product which aims at providing better customer journey analytics based on a custom data science model.",
        skills: ["Python", "PostgreSQL", "React", "Redux", "D3"],
        duration: "June 2017 - April 2019",
        location: "Bengaluru, India"
    }, {
        companyName: "Loktra",
        logo: loktra,
        website: "https://www.loktra.com/",
        position: "Full Stack Developer",
        work: "Building scalable field workforce automation application for large B2B clients. Responsible for architecting the product and building workflows.",
        skills: ["Python", "PostgreSQL", "Angular"],
        duration: "Dec 2016 - May 2017",
        location: "Bengaluru, India"
    }, {
        companyName: "AppPerfect",
        logo: appperfect,
        website: "http://www.appperfect.com/",
        position: "Software Engineer",
        work: "Experience developing comprehensive set of testing and monitoring software products for Web and Desktop / Mobile applications.",
        skills: ["Java", "PHP", "JavaScript"],
        duration: "Feb 2016 - Nov 2016",
        location: "Udaipur, India"
    }]
}
