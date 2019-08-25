import React from 'react'

import { Table } from '@/Table'
import { useTable } from '@hook/table'

function App () {
  const tableHooks = useTable()

  // explicitly pass in props in case API changes
  return (
    <Table
      {...tableHooks}
    />
  )
}

export { App }
