import React from 'react'
import { useFormik } from 'formik'

/*
  const onAddStudent = e => {
  }

  */

export const AddStudentForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      schoolName: '',
      isLicensed: ''
    },
    onSubmit: values => {
      const rowData = JSON.parse(localStorage['localRowData'])
      rowData.push(values)
      localStorage['localRowData'] = JSON.stringify(rowData)
    }

  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor='firstName'>First Name</label>
      <input
        id='firstName'
        name='firstName'
        type='text'
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      <br />

      <label htmlFor='lastName'>Last Name</label>
      <input
        id='lastName'
        name='lastName'
        type='text'
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
      <br />

      <label htmlFor='username'>Username</label>
      <input
        id='username'
        name='username'
        type='text'
        onChange={formik.handleChange}
        value={formik.values.username}
      />
      <br />

      <label htmlFor='schoolName'>School Name</label>
      <input
        id='schoolName'
        name='schoolName'
        type='text'
        onChange={formik.handleChange}
        value={formik.values.schoolName}
      />
      <br />

      <label htmlFor='license'>License</label>
      <input
        id='isLicensed'
        name='isLicensed'
        type='checkbox'
        onChange={formik.handleChange}
        value={formik.values.isLicensed}
      />
      <br />

      <button type='submit'>Submit</button>
    </form>
  )
}