import React, { useEffect, useState } from "react"

import firebase from "../firebase"
import Header from "../components/header.jsx"
import "../styles/preset.scss"
import SEO from "../components/SEO.jsx"

function Preset() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  })
  return (
    <div className="preset-parent">
      <SEO title="JSONICE" />
      <Header />
      <div className="preset">
        <p>this is preset right here</p>
      </div>
    </div>
  )
}

export default Preset
