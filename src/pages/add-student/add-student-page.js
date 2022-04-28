import React from 'react'
import { Link } from 'react-router-dom'
import { PAGE_ROUTES } from '../page-config'

export const AddStudentPage = () => {
  return (
    <div><h1>This is the Add Sudent Page</h1><Link to={PAGE_ROUTES.STUDENT_GRID}>Go to Students Page</Link></div>
  )
}
