import { useState } from 'react'
import Maybe from '@shards/maybe'
import { Ok, Err } from '@shards/result'

// ---------------------- //
// Showing usage of JSDoc //
// ---------------------- //

/**
 * A table
 * @typedef {Object} Table
 * @property {[Row]} rows
 * @property {[String]} categories
 */

/**
 * A table row
 * @typedef {Object} Row
 * @property {String} category
 * @property {String} name
 * @property {Float} value
 * @property {Int} id
 */

/**
 * Check if a row is valid
 * @param {Row} row
 * @param {[String]} categories
 * @returns {Result<_, Error>}
 */
function isValidRow (row, categories) {
  return isValidCategory(row.category, categories)
    .map(() => isValidName(row.name))
    .join()
}

/**
 * Check if a category is valid
 * @param {String} category
 * @param {() => String[]} categories
 * @returns {Result<_, Error>}
 */
function isValidCategory (category, categories) {
  return Maybe(categories.find(c => c === category))
    .match(
      // found category
      () => Ok(),
      // no such category
      () => Err(Error(`${category} is not a valid row category`))
    )
}

/**
 * @param {String} name
 * @returns {Result<_, Error>}
 */
function isValidName (name) {
  if (typeof name !== 'string') {
    return Err(Error(`${name} is not a valid row name (must be string)`))
  }
  if (name.length === 0) {
    return Err(Error('row name must have at least one character'))
  }
  return Ok()
}

/**
 * Generates a new table hook with static categories
 * and no rows
 */
function useTable () {
  const [getRows, setRows] = (function () {
    const [rows, setRows] = useState([])
    const getRows = useTable.mockGetRows || (() => rows)
    return [getRows, setRows]
  })()

  const [getCategories] = (function () {
    const [categories] = useState([
      'Electronics',
      'Kitchen',
      'Gardening',
      'Vehicles'
    ])
    const getCategories = useTable.mockGetCategories || (() => categories)
    return [getCategories]
  })()

  // ----------------------------------------------- //
  // Showing usage of Hindley-Milner type signatures //
  // ----------------------------------------------- //

  // ---- Private

  // maxId :: [Row] -> Int
  const maxId = (rows) => {
    return rows
      .map(r => r.id)
      .reduce((a, b) => (a > b ? a : b), 0)
  }

  // ---- Public

  // addRow :: Row => Result () Error
  const addRow = (row) => {
    return isValidRow(row, getCategories()).match({
      onOk () {
        setRows([
          ...getRows(),
          Object.assign({}, row, {
            id: maxId(getRows()) + 1
          })
        ])
        return Ok()
      },
      onErr (err) {
        return Err(err)
      }
    })
  }

  // mapRow :: Int -> (Row -> Row) -> Result () Error
  const mapRow = (id) => (transform) => Maybe(getRows().find(r => r.id === id))
    .match(
      // found row
      (row) => {
        // ensure it's a new row object
        const transformed = Object.assign({}, transform(row))
        return isValidRow(transformed, getCategories())
          .map(() => {
            const updatedRows = getRows().map(r => r.id === id ? transformed : r)
            setRows(updatedRows)
          })
      },
      // no such row
      () => Err(Error(`no row with id: ${id}`))
    )

  // total :: _ -> Float
  const total = () => getRows()
    .map(r => r.value)
    .reduce((a, b) => (a + b), 0)

  // map :: (Row -> a) -> [a]
  const map = (transform) => getRows().map(transform)

  return {
    addRow,
    total,
    map,
    mapRow
  }
}

export { useTable }
