import React from "react"
import { Link } from "gatsby"

import "../styles/header.scss"
function Header() {
  return (
    <header>
      <h1>
        JS<span>[O]</span>NICE
      </h1>
      <nav>
        <Link activeClassName="active" to="/docs">
          Docs
        </Link>
        <Link activeClassName="active" to="/about">
          About
        </Link>
      </nav>
    </header>
  )
}

export default Header
