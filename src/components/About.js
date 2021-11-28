

import React from 'react'


const About = () => {


    return (
        <div className="container">
            <hr />
            <div className="container">
                <h1>What is Notability on Cloud?</h1>
                <p>Well, it is basically a note taking app which stores your notes safely on the cloud. It has the ability to store your precious note title along with its description as well as a tag. More features are imminent and inevitable.</p>
            </div>
            <div className="container">
                <h1>What are the technologies used to build this app?</h1>
                <p>NoC was built using React, Node.js, Express, brcypt etc. </p>
            </div>
            <div className="container">
                <h1>About the dev.</h1>
                <div className="container d-flex">
                    <img style={{ height: "150px", borderRadius: "100px" }} src={require("./perfil.png").default} alt="" />
                    <p>Prateek has multiple projects in Web Development under his belt. Although he rarely wears a real belt, his virtual belt of projects is always growing. He will probably always be a developer at heart. </p>
                </div>
                <hr />
                <p>See his website: <strong> www.prateekgandhi.in</strong> </p>
                <p>You can reach Prateek at: <strong>prateekgandhi718@gmail.com</strong> </p>

            </div>
        </div>
    )
}
export default About
