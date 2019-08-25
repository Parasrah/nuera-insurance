import { useState } from 'react'
import Maybe from '@shards/maybe'

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
 * @param {() -> String[]} categories
 * @returns {Maybe<Error>}
 */
function isValidRow (row, categories) {
  isValidCategory(row.category, categories)
    .match(
      // category exists, check name
      () => isValidName(row.name),
      () => Maybe(Error(`${row.category} is not a valid row category`))
    )
}

/**
 * Check if a category is valid
 * @param {String} category
 * @param {() => String[]} categories
 * @returns {Maybe<Error>}
 */
function isValidCategory (category, categories) {
  return Maybe(categories().find(c => c === category))
    .match(
      // found category
      () => Maybe(),
      // no such category
      () => Maybe(Error(`${category} is not a valid row category`))
    )
}

/**
 * @param {String} name
 * @returns {Maybe<Error>}
 */
function isValidName (name) {
  if (typeof name !== 'string') {
    return Maybe(Error(`${name} is not a valid row name (must be string)`))
  }
  if (name.length === 0) {
    return Maybe(Error('row name must have at least one character'))
  }
  return Maybe()
}

/**
 * Generates a new table hook with static categories
 * and no rows
 */
function useTable () {
  const [rows, setRows] = useState([])
  const [categories] = useState([
    'Electronics',
    'Kitchen',
    'Gardening',
    'Vehicles'
  ])

  // ----------------------------------------------- //
  // Showing usage of Hindley-Milner type signatures //
  // ----------------------------------------------- //

  // ---- Private

  // maxId :: (_ -> [Row]) -> Int
  const maxId = (rows) => {
    return rows()
      .map(r => r.id)
      .reduce((a, b) => (a > b ? a : b), 0)
  }

  // ---- Public

  // addRow :: Row => Maybe Error
  const addRow = (row) => {
    return isValidRow(row, categories).match(
      // Just Error
      (error) => {
        return Maybe(error)
      },
      // Nothing
      () => {
        setRows([
          ...rows(),
          Object.assign({}, row, {
            id: maxId(rows) + 1
          })
        ])
        return Maybe()
      }
    )
  }

  // mapRow :: Int -> (Row -> Row) -> Maybe Error
  const mapRow = (id) => (transform) => Maybe(rows().find(r => r.id === id))
    .match(
      // found row
      (row) => {
        // ensure it's a new row object
        const transformed = Object.assign({}, transform(row))
        setRows(rows().map(r => r.id === id ? transformed : r))
        return Maybe()
      },
      // no such row
      () => Maybe(Error(`no row with id: ${id}`))
    )

  // total :: _ -> Float
  const total = () => rows()
    .map(r => r.value)
    .reduce((a, b) => (a + b), 0)

  // map :: (Row -> a) -> [a]
  const map = (transform) => rows().map(transform)

  return {
    addRow,
    total,
    map,
    mapRow
  }
}

export { useTable }
