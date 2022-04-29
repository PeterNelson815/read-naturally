import React from 'react'
import { Link } from 'react-router-dom'
import { PAGE_ROUTES } from '../page-config'

export const AddStudentPage = () => {

  const onAddStudent = e => {
    const rowData = JSON.parse(localStorage['localRowData'])
    rowData.push({ firstName: 'Lily', lastName: 'Evans', username: 'Doe', schoolname: 'Hogwarts', license: 'No'})
    localStorage['localRowData'] = JSON.stringify(rowData)
  }

  return (
    <div>
      <button onClick={onAddStudent}>Add a Student</button>
      <br />
      <Link to={PAGE_ROUTES.STUDENT_GRID}>Go to Students Page</Link></div>
  )
}
