import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import { Menu } from '@/Menu'
import Chevron from '@/icons/chevron-up.svg'

// TODO: look into optimizing onChange/onClick/setNotClicked
const Dropdown = ({ options, value, onChange }) => {
  const [isClicked, setIsClicked] = useState(false)
  const setNotClicked = () => setIsClicked(false)
  const toggleIsClicked = () => setIsClicked(!isClicked)
  return (
    <div
      className={`dropdown ${css(styles.dropdown)}`}
      onClick={toggleIsClicked}
    >
      <span>{value}</span>
      <Chevron
        className={css(styles.chevron)}
        viewBox='0 0 24 24'
        preserveAspectRatio
      />
      <Menu
        show={isClicked}
        options={options}
        onClick={onChange}
        onBlur={setNotClicked}
      />
    </div>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5px 7px',
    margin: '0 5px',
    transition: 'background-color 0.3s ease',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    cursor: 'pointer',
    borderRadius: '3px',
    width: '100px',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    }
  },
  chevron: {
    width: '14px',
    height: '14px',
    marginLeft: '3px'
  }
})

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export { Dropdown }
