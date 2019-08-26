import { StyleSheet } from 'aphrodite'

const width = 85

const globalStyles = StyleSheet.create({
  rowContainer: {
    height: '50px',
    width: `${width}%`,
    display: 'flex',
    justifyContent: 'space-between',
    padding: `0px ${(100 - width) / 2}%`,
    alignItems: 'center'
  }
})

export default globalStyles
