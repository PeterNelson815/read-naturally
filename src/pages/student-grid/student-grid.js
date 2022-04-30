import React, { useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
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