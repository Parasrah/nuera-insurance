import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import PropTypes from 'prop-types'

import globalStyles from '@/styles'
import { desktop } from '@/screen'

function Category ({ category, hasRows, total, children, first }) {
  return (
    <div className={css(styles.category)}>
      <div
        className={css(
          globalStyles.rowContainer,
          styles.row,
          first && styles.first
        )}
      >
        <span className={css(styles.name, styles.grow)}>{category}</span>
        {total.match({
          onOk: (value) => (<span className={css(styles.value, styles.grow)}>(${value})</span>),
          onErr (err) {
            console.error(err)
            return (<span className={css(styles.value, styles.grow)}>-</span>)
          }
        })}
        <div className={css(styles.filler)} />
        {!hasRows &&
          <div className={css(styles.line)} />
        }
      </div>
      {children}
    </div>
  )
}

const lineWidth = 95
const styles = StyleSheet.create({
  category: {
    position: 'relative',
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    color: 'rgba(0, 0, 0, 0.8)',
    fontWeight: 600
  },
  grow: {
    flex: '1 0 0'
  },
  name: {
  },
  value: {
  },
  filler: {
    flex: '0 0 24px'
  },
  row: {
    backgroundColor: '#5BBA46',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row'
  },
  line: {
    position: 'absolute',
    height: '1px',
    width: `${lineWidth}%`,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    left: `${(100 - lineWidth) / 2}%`,
    bottom: 0
  },
  first: {
    ...desktop({
      borderRadius: '10px 10px 0 0'
    })
  }
})

Category.propTypes = {
  category: PropTypes.string.isRequired,
  hasRows: PropTypes.bool.isRequired,
  total: PropTypes.object.isRequired,
  first: PropTypes.bool.isRequired
}

export { Category }
