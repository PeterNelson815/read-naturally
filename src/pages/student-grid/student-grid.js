import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

export const StudentGrid = () => {
  const [rowData, setRowData] = useState()

  useEffect(() => {
    const fetchData = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
      let response = await fetch('http://localhost:3001/student-list', requestOptions)
      const result = await response.json()
      setRowData(result)
    }

    fetchData()
  }, [])

  const [columnDefs] = useState([
    { field: 'firstName', checkboxSelection: true },
    { field: 'lastName' },
    { field: 'username' },
    { field: 'schoolName' },
    { field: 'isLicensed', headerName: 'License', valueFormatter: params => params.value === true ? 'Yes' : 'No' },
  ])

  const onSuppressKeyboardEvent = async params => {
    const isBackspaceOrDeleteKey = (params.event.keyCode === 8) || (params.event.keyCode === 46)
    if (isBackspaceOrDeleteKey) {

      const selectedRows = params.api.getSelectedRows()
      params.api.applyTransaction({ remove: selectedRows })

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedRows)
      };
      await fetch('http://localhost:3001/remove-students', requestOptions)
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