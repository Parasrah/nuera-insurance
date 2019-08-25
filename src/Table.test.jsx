/* globals describe, test, expect, jest */
import React from 'react'
import renderer from 'react-test-renderer'

import { Table } from '@/Table'
jest.mock('@/Row')

function getHookMocks () {
  return {
    addRow: jest.fn(),
    total: jest.fn(),
    map: jest.fn(),
    mapRow: jest.fn()
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
