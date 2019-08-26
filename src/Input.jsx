import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'

function Input ({
  value,
  onChange,
  type,
  placeholder,
  style,
  onEnter,
  inputRef
}) {
  return (
    <input
      className={css(styles.input, style)}
      value={type === 'number' && value !== '' ? `$${value}` : value}
      ref={inputRef}
      onChange={({ target }) => {
        const correctValue = (() => {
          if (type === 'number') {
            return target.value
              .split(/\.(.*)/).slice(0, 2)
              .map(s => s.replace(/\./, ''))
              .join('.')
              .replace(/[^0-9.]/g, '')
          } else {
            return target.value
          }
        })()
        return onChange(correctValue)
      }}
      placeholder={placeholder}
      onKeyDown={({ key }) => {
        if (key === 'Enter' && typeof onEnter === 'function') {
          setTimeout(onEnter, 0)
        }
      }}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: '50%',
    outline: 'none',
    borderRadius: '10px',
    fontFamily: 'Roboto, sans-serfif',
    fontSize: '1.2rem',
    flex: '1 1 auto',
    width: 0,
    margin: '0 10px',
    paddingLeft: '10px',
    border: 0,
    maxWidth: '250px'
  }
})

Input.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  style: PropTypes.object,
  onEnter: PropTypes.func,
  inputRef: PropTypes.object
}

export { Input }
