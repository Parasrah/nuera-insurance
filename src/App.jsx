import React from 'react'
import { StyleSheet, css } from 'aphrodite'

import { Table } from '@/Table'
import { useTable } from '@hook/table'

function App () {
  const tableHooks = useTable()

  return (
    <div className={css(styles.container)}>
      <Table {...tableHooks} />
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export { App }
