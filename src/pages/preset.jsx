import React, { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { CopyToClipboard } from "react-copy-to-clipboard"
import "react-toastify/dist/ReactToastify.css"
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

  useEffect(() => {
    if (user) {
      fetch("https://server-dummy.herokuapp.com/", {
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
        {/* <h2>Common preset</h2> */}
        <h2>My preset</h2>
        {presetList.map(preset => {
          return (
            <div key={preset.presetId} className="preset-wrapper">
              <p>{preset.schema_name}</p>
              <div className="preset-id">
                <p>{preset.presetId}</p>
                <CopyToClipboard
                  text={preset.presetId}
                  onCopy={() => {
                    toast.success(`copied: ${preset.presetId}`)
                  }}
                >
                  <button>copy</button>
                </CopyToClipboard>
              </div>
            </div>
          )
        })}
      </div>
      <ToastContainer autoClose={1000} hideProgressBar position="top-center" />
    </div>
  )
}

export default Preset
