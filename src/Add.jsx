import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'

import { Input } from '@/Input'
import { Dropdown } from '@/Dropdown'

function Add ({ addRow, getCategories }) {
  const [name, setName] = useState('')
  const [value, setValue] = useState(0)
  const [category, setCategory] = useState(getCategories()[0])
  return (
    <div className={css(styles.container)}>
      <Input placeholder='Name' value={name} onChange={setName} />
      <Input type='number' placeholder='Value ($)' value={value} onChange={setValue} />
      <Dropdown options={getCategories()} value={category} onChange={setCategory} />
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '50px',
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  }
})

Add.propTypes = {
  addRow: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired
}

export { Add }
