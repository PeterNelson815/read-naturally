import React, { useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { Button, Container } from 'react-bootstrap'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import { useStudentGridSetup } from './useStudentGridSetup'
import { useStudentGridListeners } from './useStudentGridListeners'

export const StudentGrid = () => {
  const gridRef = useRef()

  const { rowData, columnDefs } = useStudentGridSetup()
  const { onSuppressKeyboardEvent, onSortChanged, onGridReady, onCellEditingStopped } = useStudentGridListeners(gridRef)

  const saveFilter = () => {
    const filterModel = gridRef.current.api.getFilterModel()
    localStorage.setItem('STUDENT_LIST_GRID_FILTER', JSON.stringify(filterModel))
  }

  const loadFilter = () => {
    const savedFilterModel = localStorage.getItem('STUDENT_LIST_GRID_FILTER')
    if (!savedFilterModel) return
    gridRef.current.api.setFilterModel(JSON.parse(savedFilterModel))
  }

  return (
    <Container>
      <div className="ag-theme-alpine" style={{ height: '80vh', width: '100%' }}>
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '10px'
        }}
      >
        <Button onClick={saveFilter}>Save Filter</Button>
        <Button onClick={loadFilter}>Load Filter</Button>
      </div>
    </Container>
  )
}