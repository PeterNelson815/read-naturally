import React, { useState } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

export const StudentGrid = () => {

  const [rowData] = useState([
    {firstName: 'Peter', lastName: 'Nelson', username: 'Longstride', schoolname: 'Maple Grove Senior High', license: 'False'},
    {firstName: 'Number', lastName: 'Two', username: 'Panda', schoolname: 'Maple Grove Senior High', license: 'False'}
  ])

  const [columnDefs] = useState([
    { field: 'firstName'},
    { field: 'lastName'},
    { field: 'username'},
    { field: 'schoolname'},
    { field: 'license'},
  ])

  return (
    <div className="ag-theme-alpine" style={{ height: '768px', width: '1024px'}}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}>
      </AgGridReact>
    </div>
  )
}