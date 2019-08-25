import React from 'react'
import PropTypes from 'prop-types'

import { Row } from '@/Row'

function Table ({ addRow, total, map, mapRow }) {
  return <Row />
}

Table.propTypes = {
  addRow: PropTypes.func.isRequired,
  total: PropTypes.func.isRequired,
  map: PropTypes.func.isRequired,
  mapRow: PropTypes.func.isRequired
}

export { Table }
