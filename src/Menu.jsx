import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import MaybeShow from '@/hoc/MaybeShow'

// TODO: look into optimizing onClick
const Menu = (() => {
  const component = ({ options, onClick }) => {
    return (
      <div className={`menu ${css(styles.menu)}`}>
        {options.map(option => (
          <div key={option} onClick={() => onClick(option)}>{option}</div>
        ))}
      </div>
    )
  }

  // prop-types
  component.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClick: PropTypes.func.isRequired
  }

  // apply HOC
  return MaybeShow(component)
})()

const styles = StyleSheet.create({
  menu: {

  }
})

export { Menu }
