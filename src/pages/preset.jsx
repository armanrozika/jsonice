import React, { useEffect, useState } from "react"

import firebase from "../firebase"
import Header from "../components/header.jsx"
import "../styles/preset.scss"
import SEO from "../components/SEO.jsx"

function Preset() {
  const [user, setUser] = useState(null)
  const [presetList, setPresetList] = useState([])
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  })

  //console.log(user)

  useEffect(() => {
    if (user) {
      fetch("http://localhost:5000/", {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json;charset=utf-8",
          "x-user-id": user.uid,
        }),
      })
        .then(res => {
          return res.json()
        })
        .then(data => {
          setPresetList(data)
          //console.log(data)
        })
    } else {
      setPresetList([])
    }
  }, [user])
  return (
    <div className="preset-parent">
      <SEO title="JSONICE" />
      <Header />
      <div className="preset">
        <h2>Common preset</h2>
        <h2>My preset</h2>
        {presetList.map(preset => {
          return (
            <div key={preset.presetId}>
              <p>{preset.schema_name}</p>
              <p>{preset.presetId}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Preset
