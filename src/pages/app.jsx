import React, { useState, useEffect } from "react"
import Select from "react-select"
import SyntaxHighlighter from "react-syntax-highlighter"
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs"
import uuid from "react-uuid"
import { ToastContainer, toast } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"
import Header from "../components/header.jsx"

import { sanitateData } from "../helperFunction"
import firebase from "../firebase"

import SEO from "../components/SEO.jsx"
import "../styles/app.scss"

function App() {
  const [modelName, setModelName] = useState("")
  const [user, setUser] = useState(null)
  const [allRows, setAllRows] = useState(2)
  const [JSONview, setJSONview] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [rowsCount, setRowsCount] = useState([
    {
      id: uuid(),
      key: "email",
      type: "string",
      source: "randomEmail",
      custom_data: "",
      children: [],
    },
    {
      id: uuid(),
      key: "created",
      type: "date",
      source: "custom",
      custom_data: "2019-05-24 to 2020-01-17",
      children: [],
    },
    {
      id: uuid(),
      key: "is_active",
      type: "boolean",
      source: "random",
      custom_data: "",
      children: [],
    },
    {
      id: uuid(),
      key: "name",
      type: "string",
      source: "custom",
      custom_data: "",
      children_is_object: true,
      children: [
        {
          id: uuid(),
          key: "first_name",
          type: "string",
          source: "randomFirstName",
          custom_data: "",
          is_array: false,
        },
        {
          id: uuid(),
          key: "last_name",
          custom_data: "",
          type: "string",
          source: "randomLastName",
        },
      ],
    },

    {
      id: uuid(),
      key: "age",
      type: "number",
      source: "custom",
      custom_data: "25 to 65",
      children: [],
    },
    {
      id: uuid(),
      key: "cars",
      type: "string",
      source: "custom",
      rows_children: 2,
      custom_data: "",
      children_is_array: true,
      children: [
        {
          id: uuid(),
          key: "brand",
          type: "string",
          source: "custom",
          is_array: true,
          custom_data: "Toyota,Honda,Lamborghini",
        },
      ],
    },
  ])

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  })

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
  const handleKeyChangeChild = (e, parentId, childId) => {
    const currentRows = [...rowsCount]
    let parentIndex = null
    currentRows.forEach((row, idx) => {
      if (row.id === parentId) {
        parentIndex = idx
      }
    })
    currentRows[parentIndex].children.forEach((child, idx) => {
      if (child.id === childId) {
        currentRows[parentIndex].children[idx].key = e.target.value
      }
    })
    //console.log(currentRows)

    setRowsCount(currentRows)
  }

  const addChildObject = parentId => {
    const currentRows = [...rowsCount]
    currentRows.forEach((row, idx) => {
      if (row.id === parentId) {
        currentRows[idx].children_is_object = true
        currentRows[idx].children = [
          {
            id: uuid(),
            key: "",
            type: "string",
            source: "custom",
            is_array: false,
            custom_data: "",
          },
        ]
      }
    })
    setRowsCount(currentRows)
  }
  const addChildArray = parentId => {
    const currentRows = [...rowsCount]
    currentRows.forEach((row, idx) => {
      if (row.id === parentId) {
        currentRows[idx].children_is_array = true
        currentRows[idx].rows_children = 1
        currentRows[idx].children = [
          {
            id: uuid(),
            key: "",
            type: "string",
            source: "custom",
            is_array: true,
            custom_data: "",
          },
        ]
      }
    })
    setRowsCount(currentRows)
  }
  const childrenAdd = parentId => {
    const currentRows = [...rowsCount]
    currentRows.forEach((row, idx) => {
      console.log(row.children)
      if (row.id === parentId) {
        const is_array = row.children[0].is_array
        currentRows[idx].children.push({
          id: uuid(),
          key: "",
          type: "string",
          source: "custom",
          custom_data: "",
          is_array,
        })
      }
    })
    setRowsCount(currentRows)
  }

  const childrenDelete = (parentId, childId) => {
    const currentRows = [...rowsCount]
    let parentIndex = null
    currentRows.forEach((row, idx) => {
      if (row.id === parentId) {
        parentIndex = idx
      }
    })
    const newChildren = currentRows[parentIndex].children.filter(child => {
      return child.id !== childId
    })

    currentRows[parentIndex].children = newChildren

    setRowsCount(currentRows)
  }

  const typeOptions = [
    { value: "string", label: "string" },
    { value: "number", label: "number" },
    { value: "boolean", label: "boolean" },
    { value: "date", label: "date" },
  ]
  const sourceOptions = [
    { value: "custom", label: "custom" },
    { value: "random", label: "random" },
    { value: "randomFirstName", label: "randomFirstName" },
    { value: "randomLastName", label: "randomLastName" },
    { value: "randomEmail", label: "randomEmail" },
    { value: "randomDate", label: "randomDate" },
    // { value: "date_range", label: "dateRange" },
  ]

  const selectType = (e, id) => {
    const currentRows = [...rowsCount]
    currentRows.forEach((row, idx) => {
      if (row.id === id) {
        currentRows[idx].type = e.value
      }
    })
    setRowsCount(currentRows)
  }
  const selectSource = (e, id) => {
    const currentRows = [...rowsCount]
    currentRows.forEach((row, idx) => {
      if (row.id === id) {
        currentRows[idx].source = e.value
      }
    })
    setRowsCount(currentRows)
  }
  const selectChildType = (e, parentId, id) => {
    const currentRows = [...rowsCount]
    let parentIndex = null
    currentRows.forEach((row, idx) => {
      if (row.id === parentId) {
        parentIndex = idx
      }
    })
    currentRows[parentIndex].children.forEach((child, idx) => {
      if (child.id === id) {
        currentRows[parentIndex].children[idx].type = e.value
      }
    })

    setRowsCount(currentRows)
  }
  const selectChildSource = (e, parentId, id) => {
    const currentRows = [...rowsCount]
    let parentIndex = null
    currentRows.forEach((row, idx) => {
      if (row.id === parentId) {
        parentIndex = idx
      }
    })
    currentRows[parentIndex].children.forEach((child, idx) => {
      if (child.id === id) {
        currentRows[parentIndex].children[idx].source = e.value
      }
    })

    setRowsCount(currentRows)
  }

  const sendJSON = async () => {
    //console.log(rowsCount)
    if (rowsCount.length < 1) {
      return
    }

    setIsGenerating(true)
    const dataToSend = sanitateData(rowsCount, allRows)

    try {
      const res = await fetch("https://server-dummy.herokuapp.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(dataToSend),
      })
      const response = await res.json()
      setJSONview(response)
      setIsGenerating(false)
    } catch (err) {
      setIsGenerating(false)
      console.log(err)
    }
  }

  const renderInputRows = () => {
    return rowsCount.map((row, idx) => {
      const { children } = row

      const makeChildren = () => {
        if (!children.length) {
          return
        }

        if (children.length) {
          //children is arary
          return children.map((child, index) => {
            return (
              <div key={child.id}>
                <div key={child.id} className="input-rows">
                  <div>
                    <input
                      className="input-me"
                      type="text"
                      value={child.key}
                      onChange={e => handleKeyChangeChild(e, row.id, child.id)}
                    />
                  </div>
                  <div>
                    <Select
                      className="data-type"
                      classNamePrefix="select"
                      isSearchable={false}
                      defaultValue={typeOptions[0]}
                      value={{ value: child.type, label: child.type }}
                      name="color"
                      options={typeOptions}
                      placeholder="Type"
                      onChange={e => selectChildType(e, row.id, child.id)}
                    />
                  </div>
                  <div>
                    <Select
                      className="data-type"
                      classNamePrefix="select"
                      isSearchable
                      name="color"
                      defaultValue={sourceOptions[0]}
                      value={{ value: child.source, label: child.source }}
                      options={sourceOptions}
                      placeholder="Source"
                      onChange={e => selectChildSource(e, row.id, child.id)}
                    />
                  </div>
                  {child.source === "custom" && (
                    <div>
                      <input
                        className="input-me"
                        type="text"
                        value={child.custom_data}
                        spellCheck={false}
                        onChange={e => {
                          const currentRows = [...rowsCount]
                          currentRows[idx].children[index].custom_data =
                            e.target.value
                          setRowsCount(currentRows)
                        }}
                      />
                    </div>
                  )}

                  <p
                    onClick={() => childrenDelete(row.id, child.id)}
                    className="delete-row"
                  >
                    x
                  </p>
                </div>
              </div>
            )
          })
        }
      }

      return (
        <div
          key={row.id}
          className={row.children.length > 0 ? "has-children" : ""}
        >
          {row.children.length > 0 && row.children_is_array && (
            <p className="children-type">children is an ARRAY of Objects</p>
          )}
          {row.children.length > 0 && !row.children_is_array && (
            <p className="children-type">children is an OBJECT</p>
          )}
          <div key={row.id} className="input-rows">
            <div>
              <input
                className="input-me"
                type="text"
                value={row.key}
                onChange={e => handleKeyChange(e, row.id)}
              />
              {!row.children.length && (
                <div className="add-child">
                  <p onClick={() => addChildObject(row.id)}>
                    {"+{add Object}"}
                  </p>
                  <p onClick={() => addChildArray(row.id)}>+[add Array]</p>
                </div>
              )}
            </div>
            {!row.children.length && (
              <div>
                <Select
                  className="data-type"
                  classNamePrefix="select"
                  name="color"
                  isSearchable={false}
                  defaultValue={typeOptions[0]}
                  value={{ value: row.type, label: row.type }}
                  options={typeOptions}
                  onChange={e => selectType(e, row.id)}
                />
              </div>
            )}
            {!row.children.length && (
              <div>
                <Select
                  className="data-type"
                  classNamePrefix="select"
                  isSearchable
                  defaultValue={sourceOptions[0]}
                  value={{ value: row.source, label: row.source }}
                  name="color"
                  options={sourceOptions}
                  onChange={e => selectSource(e, row.id)}
                />
              </div>
            )}
            {!row.children.length && row.source === "custom" && (
              <div>
                <input
                  className="input-me"
                  type="text"
                  value={row.custom_data}
                  onChange={e => {
                    const currentRows = [...rowsCount]
                    currentRows[idx].custom_data = e.target.value
                    setRowsCount(currentRows)
                  }}
                />
              </div>
            )}
            {row.children.length > 0 && row.children_is_array && (
              <div className="children-rows">
                <label htmlFor="">Rows:</label>
                <input
                  className="children-rows-input input-me"
                  type="number"
                  value={row.rows_children}
                  min="1"
                  max="1000"
                  onChange={e => {
                    const currentRows = [...rowsCount]
                    currentRows[idx].rows_children = e.target.value
                    setRowsCount(currentRows)
                  }}
                />
              </div>
            )}

            <p onClick={() => deleteRow(row.id)} className="delete-row">
              x
            </p>
          </div>
          {makeChildren()}
          {row.children.length > 0 && (
            <button
              onClick={() => childrenAdd(row.id)}
              className="children-add"
            >
              +
            </button>
          )}
        </div>
      )
    })
  }

  return (
    <div className="app">
      <SEO title="JSONICE" />
      <Header />
      <div className="app-component">
        <div className="schema-action">
          <div className="action-control">
            <p
              onClick={sendJSON}
              className="generate"
              style={{
                backgroundColor: isGenerating ? "#72c4ff" : "#1998f4",
              }}
            >
              {isGenerating ? "Generating..." : "Generate"}
            </p>
            <div className="model-action">
              <input
                type="text"
                placeholder="model name"
                value={modelName}
                onChange={e => {
                  setModelName(e.target.value)
                }}
              />
              {user && (
                <p
                  className="generate"
                  onClick={() => {
                    const data = sanitateData(rowsCount, allRows)
                    const user_id = user.uid
                    if (!user_id) {
                      return
                    }

                    if (data.error) {
                      toast.error("Key can not be empty")
                      return
                    }
                    if (!modelName) {
                      toast.error("Name the model")
                      return
                    }
                    data.user_id = user_id
                    fetch("https://server-dummy.herokuapp.com/save", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json;charset=utf-8",
                      },
                      body: JSON.stringify(data),
                    })
                      .then(res => {
                        toast.success("Sucessfully saved")
                        console.log(res.json())
                      })
                      .catch(err => {
                        console.log(err)
                      })
                  }}
                >
                  Save
                </p>
              )}
            </div>
          </div>

          {user && (
            <div className="preset-wrapper">
              {/* <Select
              className="basic-single"
              classNamePrefix="select"
              isClearable
              isSearchable
              name="color"
              placeholder="Preset List"
            />
            <p style={{ marginRight: "15px" }}>Or</p> */}
              <input
                className="preset-input"
                type="text"
                placeholder="Preset ID"
              />
              <button>Apply</button>
            </div>
          )}
        </div>
        <div className="main-app">
          <div className="flex-child">
            <div className="rows-count">
              <p>Rows</p>
              <input
                type="number"
                min="1"
                max="1000"
                value={allRows}
                onChange={e => setAllRows(e.target.value)}
              />
            </div>
            <div className="schema-wrapper">{renderInputRows()}</div>
            <button
              onClick={() => {
                const currentRows = [...rowsCount]
                currentRows.push({
                  id: uuid(),
                  key: "",
                  type: "string",
                  source: "custom",
                  custom_data: "",
                  children: [],
                })
                setRowsCount(currentRows)
              }}
              className="add-column"
            >
              +
            </button>
          </div>

          <SyntaxHighlighter
            className="highlighter"
            language="json"
            showLineNumbers
            style={monokaiSublime}
          >
            {JSON.stringify(JSONview, null, 3)}
          </SyntaxHighlighter>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
