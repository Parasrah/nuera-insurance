import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import Plus from '@/icons/plus.svg'
import { toast } from 'react-toastify'

import { Input } from '@/Input'
import { Dropdown } from '@/Dropdown'

class Add extends React.Component {
  constructor (props) {
    super(props)

    // binding
    this.submit = this.submit.bind(this)
    this.setValue = this.setValue.bind(this)
    this.setName = this.setName.bind(this)
    this.setCategory = this.setCategory.bind(this)

    // init
    this.nameInput = React.createRef()
    this.state = {
      name: '',
      value: '',
      category: props.getCategories()[0]
    }
  }

  submit () {
    const value = (() => {
      if (this.state.value === '') {
        return Number.isNaN
      } else {
        return Number(Number.parseFloat(this.state.value).toFixed(2))
      }
    })()
    this.props.addRow({
      name: this.state.name,
      value,
      category: this.state.category
    })
      .match({
        onErr: (err) => {
          toast.error(`Error: ${err.message}`)
        },
        onOk: () => {
          this.setValue('')
          this.setName('')
          this.focusNameInput()
        }
      })
  }

  focusNameInput () {
    if (this.nameInput && this.nameInput.current) {
      this.nameInput.current.focus()
    }
  }

  setName (name) {
    this.setState(() => ({ name }))
  }

  setValue (value) {
    this.setState(() => ({ value }))
  }

  setCategory (category) {
    this.setState(() => ({ category }))
  }

  componentDidMount () {
    this.focusNameInput()
  }

  render () {
    return (
      <div className={css(styles.add)}>
        <Input
          style={styles.name}
          placeholder='Name'
          value={this.state.name}
          onChange={this.setName}
          onEnter={this.submit}
          inputRef={this.nameInput}
        />
        <Input
          type='number'
          placeholder='Value ($)'
          value={this.state.value}
          onChange={this.setValue}
          onEnter={this.submit}
        />
        <Dropdown
          options={this.props.getCategories()}
          value={this.state.category}
          onChange={this.setCategory}
        />
        <Plus
          className={css(styles.button)}
          onClick={this.submit}
        />
      </div>
    )
  }
}

const styles = StyleSheet.create({
  name: {
    marginLeft: '15px'
  },
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
    transition: 'background-color 0.2s ease',
    marginRight: '10px',
    cursor: 'pointer',
    padding: '5px'
  }
})

Add.propTypes = {
  addRow: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired
}

export { Add }
