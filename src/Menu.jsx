import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import MaybeShow from '@/hoc/MaybeShow'

// TODO: look into optimizing onClick
const Menu = (() => {
  const component = ({ options, onClick, onBlur }) => {
    // setup custom "onBlur" (div's don't support focus)
    useEffect(() => {
      document.addEventListener('click', onBlur)
      return () => document.removeEventListener('click', onBlur)
    }, [])
    return (
      <div
        className={`menu ${css(styles.menu)}`}
        onBlur={onBlur}
      >
        {options.map(option => (
          <div className={css(styles.option)} key={option} onClick={() => onClick(option)}>
            <span>{option}</span>
          </div>
        ))}
      </div>
    )
  }

  // prop-types
  component.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClick: PropTypes.func.isRequired,
    onBlur: PropTypes.func
  }

  // apply HOC
  return MaybeShow(component)
})()

const styles = StyleSheet.create({
  menu: {
    width: '100%',
    backgroundColor: '#fff',
    color: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderRadius: '10px',
    boxShadow: '0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12), 0px 2px 4px -1px rgba(0, 0, 0, 0.2)'
  },
  option: {
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    transition: 'background-color 0.3s ease',
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    ':last-child': {
      borderRadius: '0 0 10px 10px'
    },
    ':first-child': {
      borderRadius: '10px 10px 0 0'
    }
  }
})

export { Menu }
