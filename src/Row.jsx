import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import PropTypes from 'prop-types'
import globalStyles from '@/styles'
import trash from '@/icons/trash-2'

function Row ({ name, value, category, id }) {
  return (
    <div className={css(globalStyles.rowContainer)}>
      <span>{name}</span>
      <span>{value}</span>
      <trash />
    </div>
  )
}

const styles = StyleSheet.create({
})

Row.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}

export { Row }
