import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

import globalStyles from '@/styles'
import Trash from '@/icons/trash-2.svg'

function Row ({ name, value, id, deleteRow, colored }) {
  return (
    <div className={css(globalStyles.rowContainer, styles.row, colored && styles.colored)}>
      <span className={css(styles.grow, styles.name)}>{name}</span>
      <span className={css(styles.grow, styles.value)}>${value}</span>
      <Trash
        className={css(styles.trash)}
        onClick={() => deleteRow(id).match({
          onErr (err) {
            toast.error(`Error: ${err.message}`)
          },
          onOk () {}
        })}
      />
    </div>
  )
}

const styles = StyleSheet.create({
  row: {
    color: 'rgba(0, 0, 0, 0.8)',
    transition: 'font-size 0.3s ease',
    ':hover': {
      fontSize: '1.08rem'
    },
    fontWeight: 300
  },
  trash: {
    cursor: 'pointer'
  },
  grow: {
    flex: '1 0 0'
  },
  name: {
  },
  value: {
    paddingLeft: '10px'
  },
  colored: {
    backgroundColor: 'rgba(255, 255, 255, 1)'
  }
})

Row.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  deleteRow: PropTypes.func.isRequired,
  colored: PropTypes.bool.isRequired
}

export { Row }
