import React, { useState } from "react"
import Select from "react-select"
import uuid from "react-uuid"
import Header from "../components/header.jsx"

import SEO from "../components/SEO.jsx"
import "../styles/app.scss"
function App() {
  const [rowsCount, setRowsCount] = useState([
    {
      id: uuid(),
      key: "Name",
      type: "string",
      source: "randomName",
    },
  ])

  const deleteRow = key => {
    const currentRows = [...rowsCount]
    const newRows = currentRows.filter(row => {
      return row.id !== key
    })
    setRowsCount(newRows)
  }

  const handleKeyChange = (e, id) => {
    const currentRows = [...rowsCount]
    currentRows.forEach((row, idx) => {
      if (row.id === id) {
        currentRows[idx].key = e.target.value
      }
    })
    setRowsCount(currentRows)
  }

  const renderInputRows = () => {
    return rowsCount.map(row => {
      return (
        <div key={row.id} className="input-rows">
          <div>
            <input
              type="text"
              value={row.key}
              onChange={e => handleKeyChange(e, row.id)}
            />
            <div className="add-child">
              <p>{"+{Object}"}</p>
              <p>+[Array]</p>
            </div>
          </div>
          <div>
            <Select
              className="data-type"
              classNamePrefix="select"
              isClearable
              isSearchable
              name="color"
              // options={colourOptions}
              placeholder="Type"
            />
          </div>
          <div>
            <Select
              className="data-type"
              classNamePrefix="select"
              isClearable
              isSearchable
              name="color"
              // options={colourOptions}
              placeholder="Source"
            />
          </div>

          <div>
            <input type="text" />
          </div>
          <button onClick={() => deleteRow(row.id)} className="delete-row">
            x
          </button>
        </div>
      )
    })
  }

  return (
    <div className="app">
      <SEO title="JSONICE" />
      <Header />
      <div className="app-component">
        <div className="preset-wrapper">
          <Select
            className="basic-single"
            classNamePrefix="select"
            isClearable
            isSearchable
            name="color"
            // options={colourOptions}
            placeholder="Preset List"
          />
          <p style={{ marginRight: "15px" }}>Or</p>
          <input
            className="preset-input"
            type="text"
            placeholder="Preset Key"
          />
          <button>Apply</button>
        </div>
        <div className="main-app">
          <div className="flex-child">
            <p className="view-schema">view schema</p>
            <div className="rows-count">
              <p>Rows</p>
              <input type="number" min="1" max="1000" />
            </div>
            <div className="schema-wrapper">{renderInputRows()}</div>
            <button
              onClick={() => {
                const currentRows = [...rowsCount]
                currentRows.push({
                  id: uuid(),
                  key: "",
                  type: "string",
                  source: "randomName",
                })
                setRowsCount(currentRows)
              }}
              className="add-column"
            >
              +
            </button>
          </div>
          <div className="flex-child">right</div>
        </div>
      </div>
    </div>
  )
}

export default App
