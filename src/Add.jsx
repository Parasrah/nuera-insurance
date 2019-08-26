import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import Plus from '@/icons/plus.svg'
import { toast } from 'react-toastify'

import { Input } from '@/Input'
import { Dropdown } from '@/Dropdown'

// TODO: look into optimizing onClick
function Add ({ addRow, getCategories }) {
  const [name, setName] = useState('')
  const [value, setValue] = useState(0)
  const [category, setCategory] = useState(getCategories()[0])
  return (
    <div className={css(styles.add)}>
      <div className='filler' />
      <Input placeholder='Name' value={name} onChange={setName} />
      <Input type='number' placeholder='Value ($)' value={value} onChange={setValue} />
      <Dropdown options={getCategories()} value={category} onChange={setCategory} />
      <Plus
        className={css(styles.button)}
        onClick={() => addRow({ name, value, category })
          .match({
            onErr (err) {
              toast.error(`Error: ${err.message}`)
            },
            onOk () {
              setValue(0)
              setName('')
            }
          })
        }
      />
      <div className='filler' />
    </div>
  )
}

const styles = StyleSheet.create({
  add: {
    height: '60px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#519657',
    color: 'rgba(255, 255, 255, 1)'
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    borderRadius: '50%',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },
    transition: 'background-color 0.2s ease'
  }
})

Add.propTypes = {
  addRow: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired
}

export { Add }
