import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import { Menu } from '@/Menu'

// TODO: look into optimizing onChange/onClick
const Dropdown = ({ options, value, onChange }) => {
  const [isClicked, setIsClicked] = useState(false)
  const toggleIsClicked = () => setIsClicked(!isClicked)
  return (
    <div
      className={`dropdown ${css(styles.dropdown)}`}
      onClick={toggleIsClicked}
    >{value}
      <div className={`menu ${css(styles.menu)}`}>
        <Menu
          show={isClicked}
          options={options}
          onClick={onChange}
        />
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    padding: '5px 7px',
    margin: '0 5px',
    transition: 'background-color 0.3s ease',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    cursor: 'pointer',
    borderRadius: '3px',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    }
  }
})

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export { Dropdown }
