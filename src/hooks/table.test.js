/* globals describe, test, jest, expect, beforeEach, afterEach */

import { useTable } from '@hook/table'
import { getStates, clear } from 'react'

jest.mock('react', () => {
  let states = []
  return {
    useState (initial) {
      const index = states.length
      states.push(Object.freeze(initial))

      return [
        states[index],
        function (fresh) {
          states[index] = Object.freeze(fresh)
        }
      ]
    },
    getStates () {
      return [...states]
    },
    clear () {
      states = []
    }
  }
})

let addRow, getTotal

beforeEach(() => {
  useTable.mockGetRows = () => getStates()[0]
  useTable.mockGetCategories = () => getStates()[1]
  ;({ addRow, getTotal } = useTable())
})

afterEach(() => {
  clear()
})

describe('#addRow', () => {
  test('appends with valid row', () => {
    expect(getStates()[0]).toHaveLength(0)
    addRow({ name: 'test-name', value: 50.5, category: 'Electronics' })
    expect(getStates()[0]).toHaveLength(1)
    let getRow = () => getStates()[0][0]
    expect(getRow()).toHaveProperty('name', 'test-name')
    expect(getRow()).toHaveProperty('value', 50.5)
    expect(getRow()).toHaveProperty('category', 'Electronics')
    addRow({ name: 'another name', value: 60000, category: 'Kitchen' })
    expect(getStates()[0]).toHaveLength(2)
    getRow = () => getStates()[0][1]
    expect(getRow()).toHaveProperty('name', 'another name')
    expect(getRow()).toHaveProperty('value', 60000)
    expect(getRow()).toHaveProperty('category', 'Kitchen')
  })

  test('gives row unique id', () => {
    addRow({ name: 'test-name', value: 50.5, category: 'Electronics' })
    expect(getStates()[0][0]).toHaveProperty('id', 1)
    addRow({ name: 'another name', value: 60000, category: 'Kitchen' })
    expect(getStates()[0][1]).toHaveProperty('id', 2)
  })

  test('returns Nothing with valid row', () => {
    return new Promise((resolve, reject) => {
      const res = addRow({ name: 'test-name', value: 50.5, category: 'Kitchen' })
      res.match({
        onErr: (err) => reject(err),
        onOk: () => resolve()
      })
    })
  })

  test('fails with invalid name', () => {
    return new Promise((resolve, reject) => {
      addRow({ name: '', value: 88, category: 'Kitchen' })
        .match({
          onErr: resolve,
          onOk: () => reject(Error('should have failed with empty name'))
        })
    })
  })

  test('fails with invalid category', () => {
    return new Promise((resolve, reject) => {
      addRow({ name: 'test name', value: 88, category: 'Skydiving' })
        .match({
          onErr: resolve,
          onOk: () => reject(Error('should have failed with invalid category'))
        })
    })
  })
})

describe('#getTotal', () => {
  test('calculates total values', () => {
    const a = 10.5
    const b = 0.86
    addRow({ name: 'test-name', value: a, category: 'Electronics' })
    addRow({ name: 'another name', value: b, category: 'Kitchen' })
    expect(getTotal()).toEqual(a + b)
  })
})
