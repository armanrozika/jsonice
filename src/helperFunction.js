export const sanitateData = (data, parentRows) => {
  const error = []

  //keys can not be empty
  data.forEach(item => {
    if (!item.key) {
      error.push("err")
    }
    if (item.children.length) {
      item.children.forEach(child => {
        if (!child.key) {
          error.push("err")
        }
      })
    }
  })

  if (error.length > 0) {
    return {
      error: true,
      message: "Key can not be empty",
    }
  }

  const currentData = [...data]
  const newSchema = {}
  currentData.forEach(item => {
    newSchema[item.key] = [item.type, item.source, item.custom_data]
    if (item.children.length > 0 && item.children_is_array) {
      let childrenSchema = { schema: {} }
      item.children.forEach(child => {
        childrenSchema.rows = item.rows_children
        childrenSchema.schema[child.key] = [
          child.type,
          child.source,
          child.custom_data,
        ]
      })
      newSchema[item.key] = childrenSchema
    }
    if (item.children.length > 0 && item.children_is_object) {
      let childrenSchema = {}
      item.children.forEach(child => {
        childrenSchema[child.key] = [
          child.type,
          child.source,
          child.custom_data,
        ]
      })
      newSchema[item.key] = childrenSchema
    }
  })
  const rowParent = Number(parentRows)
  return {
    raw: data,
    sanitized: {
      rows: rowParent,
      schema: newSchema,
    },
  }
}
