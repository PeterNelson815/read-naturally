import React from 'react'
import { Link } from 'react-router-dom'
import { PAGE_ROUTES } from '../page-config'
import { AddStudentForm } from './add-student-form'

export const AddStudentPage = () => {

  return (
    <div>
      <AddStudentForm />
      <br />
      <Link to={PAGE_ROUTES.STUDENT_GRID}>Go to Students Page</Link>
    </div>
  )
}
