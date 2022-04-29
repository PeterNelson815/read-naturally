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
    { field: 'firstName', checkboxSelection: true, sortable: true },
    { field: 'lastName', sortable: true },
    { field: 'username', sortable: true },
    { field: 'schoolName', sortable: true },
    { field: 'isLicensed', sortable: true, headerName: 'License', valueFormatter: params => params.value === true ? 'Yes' : 'No' },
  ])

  const onSuppressKeyboardEvent = async params => {
    const isBackspaceOrDeleteKey = (params.event.keyCode === 8) || (params.event.keyCode === 46)
    if (isBackspaceOrDeleteKey) {

      const selectedRows = params.api.getSelectedRows()

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedRows)
      };
      const result = await fetch('http://localhost:3001/remove-students', requestOptions)
      if (result.ok) {
        // only update the ag-grid if the delete was successful
        params.api.applyTransaction({ remove: selectedRows })
      } else {
        // api calls never fail, this is essentially a dead code block
        // (but actually, should have some kind of error notification to user here that the delete failed)
      }
    }
  }

  const onSortChanged = params => {
    localStorage.setItem('STUDENT_LIST_GRID_SORT', JSON.stringify(params.columnApi.getColumnState()))
  }

  const onFilterChanged = params => {
    localStorage.setItem('STUDENT_LIST_GRID_FILTER', params.api.getFilterModel())
    console.log('filter changed')
  }

  const onGridReady = params => {
    const savedSort = localStorage.getItem('STUDENT_LIST_GRID_SORT')
    if (!savedSort) return
    params.columnApi.setColumnState(JSON.parse(savedSort))
  }

  return (
    <div className="ag-theme-alpine" style={{ height: '768px', width: '1024px' }}>
      <AgGridReact
        rowSelection={"multiple"}
        rowData={rowData}
        columnDefs={columnDefs}
        onSortChanged={onSortChanged}
        onFilterChanged={onFilterChanged}
        onGridReady={onGridReady}
        defaultColDef={{
          suppressKeyboardEvent: onSuppressKeyboardEvent
        }}>
      </AgGridReact>
    </div>
  )
}