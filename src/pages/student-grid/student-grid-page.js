import React from 'react'
import { Link } from 'react-router-dom'
import { PAGE_ROUTES } from '../page-config'
import { StudentGrid } from './student-grid'

export const StudentGridPage = () => {
  return (
    <div>
      <Link to={PAGE_ROUTES.ADD_STUDENT}>Add Student</Link>
      <br />
      <StudentGrid />
    </div>
  )
}