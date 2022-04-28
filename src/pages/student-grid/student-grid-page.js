import React from 'react'
import { Link } from 'react-router-dom'

export const StudentGridPage = () => {
  return (
    <div><h1>This is the Students page</h1><Link to='/add-student'>Add Student</Link></div>
  )
}