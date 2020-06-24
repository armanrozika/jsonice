import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import firebase from "../firebase"

import "../styles/header.scss"
function Header() {
  const [showLogin, setShowLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsLoading(false)
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
        setIsLoading(false)
      }
    })
    return function () {
      unsubscribe()
    }
  })
  return (
    <header>
      <h1>
        JS<span>[O]</span>NICE
      </h1>
      <nav>
        <a href="https://github.com/armanrozika/jsonice" target="_blank">
          <svg
            height="26"
            viewBox="0 0 16 16"
            version="1.1"
            width="26"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            ></path>
          </svg>
        </a>
        <Link activeClassName="active" to="/app">
          App
        </Link>

        <Link activeClassName="active" to="/preset">
          Preset
        </Link>

        <Link activeClassName="active" to="/docs">
          Docs
        </Link>
        <Link activeClassName="active" to="/about">
          About
        </Link>
        {isLoggedIn ? (
          <button
            className="login"
            onClick={() => {
              firebase.auth().signOut()
            }}
          >
            Logout
          </button>
        ) : (
          <button className="login" onClick={() => setShowLogin(true)}>
            Login
          </button>
        )}
      </nav>
      <div
        className="login-modal"
        style={{ display: showLogin ? "block" : "none" }}
        onClick={e => {
          e.stopPropagation()

          if (e.target.className === "login-modal") {
            setShowLogin(false)
          }
        }}
      >
        <div className="login-method">
          <p>Login With</p>
          <button
            onClick={() => {
              var provider = new firebase.auth.GoogleAuthProvider()
              firebase
                .auth()
                .signInWithPopup(provider)
                .then(function (result) {
                  setShowLogin(false)
                })
                .catch(function (error) {
                  // Handle Errors here.
                  var errorCode = error.code
                  var errorMessage = error.message
                  // The email of the user's account used.
                  var email = error.email
                  // The firebase.auth.AuthCredential type that was used.
                  var credential = error.credential
                  // ...
                })
            }}
          >
            Google
          </button>
          <button
            onClick={() => {
              var provider = new firebase.auth.TwitterAuthProvider()
              firebase
                .auth()
                .signInWithPopup(provider)
                .then(function (result) {
                  console.log(result.user)
                  setShowLogin(false)
                })
                .catch(function (error) {
                  // Handle Errors here.
                  var errorCode = error.code
                  var errorMessage = error.message
                  // The email of the user's account used.
                  var email = error.email
                  // The firebase.auth.AuthCredential type that was used.
                  var credential = error.credential
                  // ...
                })
            }}
          >
            Twitter
          </button>
          <button
            onClick={() => {
              var provider = new firebase.auth.GithubAuthProvider()
              firebase
                .auth()
                .signInWithPopup(provider)
                .then(function (result) {
                  setShowLogin(false)
                })
                .catch(function (error) {
                  // Handle Errors here.
                  var errorCode = error.code
                  var errorMessage = error.message
                  // The email of the user's account used.
                  var email = error.email
                  // The firebase.auth.AuthCredential type that was used.
                  var credential = error.credential
                  // ...
                })
            }}
          >
            GitHub
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
