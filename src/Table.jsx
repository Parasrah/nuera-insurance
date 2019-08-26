import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'

import { Category } from '@/Category'
import { Add } from '@/Add'

function Table ({
  addRow,
  total,
  mapRow,
  fromCategories,
  categoryTotal,
  deleteRow,
  getCategories
}) {
  return (
    <div className={css(styles.mobileSize, styles.desktopSize, styles.container)}>
      {fromCategories()
        // ensure there is at least one row
        .filter(([_, rows]) => rows.length)
        .map(([category, rows]) => (
          <Category
            key={category}
            category={category}
            rows={rows}
            total={categoryTotal(category)}
          />
        ))
      }
      <div className={css(styles.filler)} />
      <Add
        className={css(styles.add)}
        addRow={addRow}
        getCategories={getCategories}
      />
    </div>
  )
}

const breakpoint = 800

const styles = StyleSheet.create({
  desktopSize: {
    [`@media (min-width: ${breakpoint + 1}px)`]: {
      width: '50%',
      height: '70%',
      marginBottom: '5%',
      borderRadius: '10px'
    }
  },
  mobileSize: {
    [`@media (max-width: ${breakpoint}px)`]: {
      height: '100%',
      width: '100%',
      margin: 0
    }
  },
  container: {
    backgroundColor: '#eeeeee',
    fontFamily: 'Roboto, sans-serif',
    display: 'flex',
    flexDirection: 'column'
  },
  add: {
    alignSelf: 'flex-end'
  },
  filler: {
    flex: '1 0 0'
  }
})

Table.propTypes = {
  addRow: PropTypes.func.isRequired,
  total: PropTypes.func.isRequired,
  mapRow: PropTypes.func.isRequired,
  fromCategories: PropTypes.func.isRequired,
  categoryTotal: PropTypes.func.isRequired,
  deleteRow: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired
}

export { Table }
