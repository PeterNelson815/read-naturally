import React, { useEffect, useState, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

export const StudentGrid = () => {
  const [rowData, setRowData] = useState()

  const gridRef = useRef()

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
      let response = await fetch('http://localhost:3001/student-list', requestOptions)
      const result = await response.json()
      setRowData(result)
    }

    fetchData()
  }, [])

  const [columnDefs] = useState([
    { field: 'firstName', sortable: true, editable: true, filter: 'agTextColumnFilter', checkboxSelection: true },
    { field: 'lastName', sortable: true, editable: true, filter: 'agTextColumnFilter' },
    { field: 'username', sortable: true, editable: true, filter: 'agTextColumnFilter' },
    { field: 'schoolName', sortable: true, editable: true, filter: 'agTextColumnFilter' },
    { field: 'isLicensed', sortable: true, editable: true, headerName: 'License', valueFormatter: params => params.value === true ? 'Yes' : 'No' },
  ])

  const onSuppressKeyboardEvent = async params => {
    const isDeleteKey = params.event.keyCode === 46
    if (isDeleteKey) {

      const selectedRows = params.api.getSelectedRows()

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedRows)
      }
      const result = await fetch('http://localhost:3001/remove-students', requestOptions)
      if (result.ok) {
        // only update the ag-grid if the delete was successful
        params.api.applyTransaction({ remove: selectedRows })
      } else {
        // api calls never fail, this is essentially a dead code block
        // (but actually, should have some kind of error notification to user here that the delete failed)
      }
    }

    const isEnterKey = params.event.keyCode === 13
    if (isEnterKey) {
      gridRef.current.api.stopEditing()
    }
  }

  const onSortChanged = params => {
    localStorage.setItem('STUDENT_LIST_GRID_SORT', JSON.stringify(params.columnApi.getColumnState()))
  }

  const onGridReady = params => {
    const savedSort = localStorage.getItem('STUDENT_LIST_GRID_SORT')
    if (!savedSort) return
    params.columnApi.applyColumnState(JSON.parse(savedSort))
  }

  const saveFilter = () => {
    const filterModel = gridRef.current.api.getFilterModel()
    localStorage.setItem('STUDENT_LIST_GRID_FILTER', JSON.stringify(filterModel))
  }

  const loadFilter = () => {
    const savedFilterModel = localStorage.getItem('STUDENT_LIST_GRID_FILTER')
    if (!savedFilterModel) return
    gridRef.current.api.setFilterModel(JSON.parse(savedFilterModel))
  }

  const onCellEditingStopped = async params => {
    //there must be a way to pull this data straight from 'params' but I just could not find it
    const updatedData = params.api.getRowNode(params.rowIndex).data

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    }
    const result = await fetch('http://localhost:3001/update-student', requestOptions)
    if (!result.ok) {
      console.log('failed to update the database, someone should probably do something')
    }
  }

  return (
    <div>
      <button onClick={saveFilter}>Save Filter</button>
      <button onClick={loadFilter}>Load Filter</button>
      <div className="ag-theme-alpine" style={{ height: '768px', width: '1024px' }}>
        <AgGridReact
          ref={gridRef}
          rowSelection={"multiple"}
          rowData={rowData}
          columnDefs={columnDefs}
          onSortChanged={onSortChanged}
          onGridReady={onGridReady}
          onCellEditingStopped={onCellEditingStopped}
          defaultColDef={{
            suppressKeyboardEvent: onSuppressKeyboardEvent
          }}>
        </AgGridReact>
      </div>
    </div>
  )
}