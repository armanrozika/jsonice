import React from "react"
import { Link } from "gatsby"

import SEO from "../components/SEO.jsx"
import "../styles/index.scss"

export default function Home() {
  return (
    <div className="home">
      <SEO title="JSONICE" />
      <div className="main-content">
        <h1>
          JS<span>[O]</span>NICE
        </h1>
        <p>
          An online (GUI-based) tool for generating JSON data, with real API
          call.
        </p>
        <p>No more copy-paste.</p>
        <Link to="/app">
          <button>Get started</button>
        </Link>
      </div>
    </div>
  )
}
