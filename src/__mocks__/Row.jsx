import React from 'react'

function Row ({ name, value, id }) {
  return <div className={`${name} ${value} ${id}`} />
}

export { Row }
