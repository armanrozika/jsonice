import React from "react"
import SEO from "../components/SEO.jsx"
import Header from "../components/header.jsx"
import "../styles/about.scss"

function About() {
  return (
    <div className="about">
      <Header />
      <SEO title="JSONICE" />
      <div className="content-about">
        <h2>About JSONICE</h2>
        <p>JSONICE is an online GUI-based json generator.</p>
        <p>
          There are many json generator out there. What makes JSONICE different
          is that it capable of generate json data via nice GUI form.
        </p>
        <p>
          Often times, we don't have time to tinker with syntax, and just need
          the data right away.
        </p>
      </div>
    </div>
  )
}

export default About
