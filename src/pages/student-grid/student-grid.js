import React, { useState } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

export const StudentGrid = () => {

  const localRowData = JSON.parse(localStorage.getItem('localRowData'))

  const [rowData] = useState(localRowData)

  const [columnDefs] = useState([
    { field: 'firstName', checkboxSelection: true },
    { field: 'lastName' },
    { field: 'username' },
    { field: 'schoolname' },
    { field: 'license' },
  ])

  const onSuppressKeyboardEvent = params => {
    const isBackspaceOrDeleteKey = (params.event.keyCode === 8) || (params.event.keyCode === 46)
    if (isBackspaceOrDeleteKey) {
      const selectedRows = params.api.getSelectedRows();
      params.api.applyTransaction({ remove: selectedRows });
      // TODO - remove rows from database
      return true;
    }
  }

  return (
    <div className="ag-theme-alpine" style={{ height: '768px', width: '1024px' }}>
      <AgGridReact
        rowSelection={"multiple"}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{
          suppressKeyboardEvent: onSuppressKeyboardEvent
        }}>
      </AgGridReact>
    </div>
  )
}