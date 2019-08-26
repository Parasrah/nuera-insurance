import React from 'react'
import PropTypes from 'prop-types'

/**
 * @param <React.Component> Inner
 */
function wrap (Inner) {
  const Outer = ({ show, ...rest }) => {
    if (show) {
      return <Inner {...rest} />
    } else {
      return null
    }
  }

  // prop-types
  if (Inner.propTypes) {
    Outer.propTypes = {
      ...Inner.propTypes,
      show: PropTypes.bool.isRequired
    }
  } else {
    Outer.propTypes = {
      show: PropTypes.bool.isRequired
    }
  }

  return Outer
}

export default wrap
