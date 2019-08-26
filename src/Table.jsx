import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'

import { Row } from '@/Row'

function Table ({ addRow, total, map, mapRow }) {
  return (
    <div className={css(styles.mobileSize, styles.desktopSize, styles.blue)}>
      {map(r => <Row {...r} />)}
    </div>
  )
}

const breakpoint = 800

const styles = StyleSheet.create({
  desktopSize: {
    [`@media (min-width: ${breakpoint + 1}px)`]: {
      width: '50%',
      height: '70%',
      marginBottom: '5%'
    }
  },
  mobileSize: {
    [`@media (max-width: ${breakpoint}px)`]: {
      height: '100%',
      width: '100%',
      margin: 0
    }
  },
  blue: {
    backgroundColor: 'blue'
  }
})

Table.propTypes = {
  addRow: PropTypes.func.isRequired,
  total: PropTypes.func.isRequired,
  map: PropTypes.func.isRequired,
  mapRow: PropTypes.func.isRequired
}

export { Table }
