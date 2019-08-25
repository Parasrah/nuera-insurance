import React from 'react'

import { Table } from '@/Table'
import { useTable } from '@hook/table'

function App () {
  const tableHooks = useTable()

  return (
    <Table
      {...tableHooks}
    />
  )
}

export { App }
