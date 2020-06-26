import React from "react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs"
import SEO from "../components/SEO.jsx"
import Header from "../components/header.jsx"
import "../styles/docs.scss"

function Tutorial() {
  const codeString = `
      //in this example I use fetch, you can use axios or other libraries
      //just make sure to include this below as your request body
      const reqBody = {
        //change presetId with correct preset ID
        doc_id: presetId 
      }
    
      const fetchData = async ()=> {
        try{
          //this is correct API endpoint, don't mind the name ^_^
          const response = await fetch("https://server-dummy.herokuapp.com/api", {
            method: 'POST',
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(reqBody)
          });
          const data = await res.json()
          //your data
          console.log(data)
        }catch(err){
          console.log(err)
        }
      };

      //don't forget to invoke the function
      //obviously, you can implement the API call however you like, just make sure your request body looks like one above
      fetchData()
  
  
  `
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
          Add object will make the child as an object, and add array will make
          the child as array of objects, that's why there is a rows count input
          if you add array.
        </p>
        <br />
        <h3>Save and apply preset</h3>
        <p>
          You can save your current model as a preset so you can share it to
          anyone else (you need to login), or use it again in the future.
        </p>
        <p>
          To save preset, just give your preset a name and then hit save. Your
          presets will be available in the Preset page.
        </p>
        <p>To apply a preset, fill in the preset id and hit apply</p>
        <br />
        <h3>API Call via your App</h3>
        <p>
          You can do API call to JSONICE backend via your app (NO need to login,
          as long as you have the preset ID), here's to do it:
        </p>
        <SyntaxHighlighter
          className="highlighter"
          language="javascript"
          // showLineNumbers
          style={atomOneDark}
          wrapLines={true}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
      <br />
    </div>
  )
}

export default Tutorial
