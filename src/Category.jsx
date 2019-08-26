import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import PropTypes from 'prop-types'

import { Row } from '@/Row'
import globalStyles from '@/styles'

function Category ({ category, rows, total }) {
  return (
    <div>
      <div className={css(globalStyles.rowContainer, styles.container)}>
        <span>{category}</span>
        <span>
          {total.match({
            onOk: (value) => (<span>{value}</span>),
            onErr (err) {
              console.error(err)
              return (<span>-</span>)
            }
          })}
        </span>
      </div>
      {rows.map(r => <Row {...r} />)}
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5BBA46'
  }
})

Category.propTypes = {
  category: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  total: PropTypes.object.isRequired
}

export { Category }
