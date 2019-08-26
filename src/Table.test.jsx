/* globals describe, test, expect, jest */
import React from 'react'
import renderer from 'react-test-renderer'

import { Table } from '@/Table'
jest.mock('@/Row')

function getHookMocks () {
  return {
    addRow: jest.fn(),
    getTotal: jest.fn().mockReturnValue(687.79),
    fromCategories: jest.fn().mockReturnValue([]),
    categoryTotal: jest.fn().mockReturnValue(66.99),
    deleteRow: jest.fn(),
    getCategories: jest.fn().mockReturnValue(['Electronics'])
  }
}

describe('#render', () => {
  test('renders correctly', () => {
    const hookMocks = getHookMocks()
    const tree = renderer
      .create(<Table {...hookMocks} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
