/* globals expect, jest, describe, test */
import React from 'react'
import renderer from 'react-test-renderer'

import { App } from '@/App'
jest.mock('@/Table')

describe('#render', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(<App />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
