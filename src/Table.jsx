import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Ok } from '@shards/result'

import { Row } from '@/Row'
import { Category } from '@/Category'
import { Add } from '@/Add'
import { desktop, mobile } from '@/screen'

function Table ({
  addRow,
  getTotal,
  fromCategories,
  categoryTotal,
  deleteRow,
  getCategories
}) {
  return (
    <div className={css(styles.mobileSize, styles.desktopSize, styles.table)}>
      <div className={css(styles.categories)}>
        {fromCategories()
          .filter(([_, rows]) => !!rows.length)
          .map(([category, rows], cIndex) => (
            <Category
              key={category}
              category={category}
              total={categoryTotal(category)}
              hasRows={!!rows.length}
              first={cIndex === 0}
            >
              {rows.map((r, rIndex) => <Row key={r.id} {...r} deleteRow={deleteRow} colored={!!(rIndex % 2)} />)}
            </Category>
          ))
        }
        <Category
          key='Total'
          category='Total'
          total={Ok(getTotal())}
          hasRows={false}
          first={false}
        />
      </div>
      <div className={css(styles.filler)} />
      <div className={css(styles.bottom)}>
        <Add
          addRow={addRow}
          getCategories={getCategories}
        />
      </div>
      <ToastContainer />
    </div>
  )
}

const styles = StyleSheet.create({
  categories: {
    overflowY: 'auto'
  },
  bottom: {
    flex: '0 0 auto'
  },
  desktopSize: {
    ...desktop({
      width: '50%',
      height: '70%',
      marginBottom: '5%',
      borderRadius: '10px',
      boxShadow: '0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12), 0px 3px 5px -1px rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(0, 0, 0, 0.2)'
    })
  },
  mobileSize: {
    ...mobile({
      height: '100%',
      width: '100%',
      margin: 0
    })
  },
  table: {
    backgroundColor: '#eeeeee',
    fontFamily: 'Roboto, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  filler: {
    flex: '1 0 0'
  }
})

Table.propTypes = {
  addRow: PropTypes.func.isRequired,
  getTotal: PropTypes.func.isRequired,
  fromCategories: PropTypes.func.isRequired,
  categoryTotal: PropTypes.func.isRequired,
  deleteRow: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired
}

export { Table }
