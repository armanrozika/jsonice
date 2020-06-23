import React from "react"
import SEO from "../components/SEO.jsx"
import Header from "../components/header.jsx"
import "../styles/docs.scss"

function Tutorial() {
  return (
    <div className="docs">
      <Header />
      <SEO title="JSONICE" />
      <div className="content-docs">
        <h2>Some Docs</h2>
        <h3>Form input structure</h3>
        <p>
          There are four inputs available: <code>key</code> <code>type</code>{" "}
          <code>source</code> and <code>custom source</code>
        </p>
        <ul>
          <li>
            <code>key</code> : key is the first input. In here, we type in the
            property name of the data.
          </li>
          <li>
            <code>type</code> : in this input we select the data type.
          </li>
          <li>
            <code>source</code> : there are already some source available for
            generate data, however you can select custom source as well.
          </li>
          <li>
            <code>custom source</code> : if you select <code>custom</code> as
            your source, this input will appear. <br />
            If you want to randomize string, just add comma as a separator.{" "}
            <br />
            For randomizing number range just use <code>to</code>. For example,
            if you want to randomize number within range 20 and 30, just type{" "}
            <code>20 to 30</code> in the input field. <br />
            Same goes for date, just make sure you use the format of{" "}
            <code>YYYY-MM-DD</code>.
          </li>
        </ul>
        <h3>Adding nested child</h3>
        <p>To add child, there are two options, add object and add array.</p>
        <p>
          Add object will make the child as object, and add array will make the
          child as array of objects, that's why there is a rows count input if
          you add array.
        </p>
      </div>
    </div>
  )
}

export default Tutorial
