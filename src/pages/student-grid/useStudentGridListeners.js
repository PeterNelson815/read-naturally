
export const useStudentGridListeners = gridRef => {

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
      console.log('failed to update the database, roll back the last edit')
    }
  }


  return { onSuppressKeyboardEvent, onSortChanged, onGridReady, onCellEditingStopped } 
}