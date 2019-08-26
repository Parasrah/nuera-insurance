import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'

function Input ({
  value,
  onChange,
  type,
  placeholder
}) {
  return (
    <input
      className={css(styles.input)}
      value={value}
      onChange={({ target }) => onChange(target.value)}
      placeholder={placeholder}
      type={type}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: '80%',
    textDecoration: 'none',
    borderRadius: '10px'
  }
})

Input.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired
}

export { Input }