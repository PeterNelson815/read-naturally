import React, { useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { Button, Container, Modal } from 'react-bootstrap'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import { useStudentGridSetup } from './useStudentGridSetup'
import { useStudentGridListeners } from './useStudentGridListeners'

export const StudentGrid = () => {
  const gridRef = useRef()
  const [shouldShowStudentModal, setShouldShowStudentModal] = useState(false)
  const [modalUsername, setModalUsername] = useState('')
  const closeModal = () => setShouldShowStudentModal(false)

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

  const openModalIfUsernameClicked = params => {
    if (params.column.colId !== 'username') return
    setModalUsername(params.data.username)
    setShouldShowStudentModal(true)
  }

  return (
    <>
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
            onCellClicked={openModalIfUsernameClicked}
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
      <Modal show={shouldShowStudentModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Photo for {modalUsername}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* this image path wouldn't be hardcoded of course, would likely be a fetch call to the db */}
          <img src='/img/StudentPhoto.png' alt='actually this student trust me'/>
        </Modal.Body>
      </Modal>
    </>
  )
}