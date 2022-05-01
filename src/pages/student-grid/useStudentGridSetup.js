import { useState, useEffect } from 'react'
import { ROUTE } from '../../routes'

export const useStudentGridSetup = () => {
  const [rowData, setRowData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
      let response = await fetch(ROUTE.FETCH_STUDENT_LIST, requestOptions)
      const result = await response.json()
      setRowData(result)
    }

    fetchData()
  }, [])

  const [columnDefs] = useState([
    { field: 'firstName', sortable: true, editable: true, filter: 'agTextColumnFilter', checkboxSelection: true },
    { field: 'lastName', sortable: true, editable: true, filter: 'agTextColumnFilter' },
    { field: 'username', sortable: true, filter: 'agTextColumnFilter' },
    { field: 'schoolName', sortable: true, editable: true, filter: 'agTextColumnFilter' },
    { field: 'isLicensed', sortable: true, editable: true, headerName: 'License', valueFormatter: params => params.value === true ? 'Yes' : 'No' },
  ])

  return { rowData, columnDefs } 
}