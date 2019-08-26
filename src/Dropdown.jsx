import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'

function Dropdown ({ options, value, onChange }) {
  return (
    <div className={`dropdown ${css(styles.container)}`}>
      <div className={`menu ${css(styles.menu)}`}>
        {options.map(option => <div>{option}</div>)}
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  menu: {
    opacity: 0
  }
})

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export { Dropdown }
