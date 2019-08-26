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

  }
})

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export { Dropdown }
