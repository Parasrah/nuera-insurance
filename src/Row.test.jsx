/* globals test, describe, expect */
import { Row } from '@/Row'
import React from 'react'
import renderer from 'react-test-renderer'

describe('#render', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(<Row
        name='TV'
        value={979.99}
        category='Electronics'
        id={6}
        deleteRow={() => {}}
        colored={true}
      />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
