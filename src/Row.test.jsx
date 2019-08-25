/* globals test, describe, expect */
import { Row } from '@/Row'
import React from 'react'
import renderer from 'react-test-renderer'

describe('#render', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(<Row />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
