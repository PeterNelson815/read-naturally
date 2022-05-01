import React from 'react'
import { useNavigate } from "react-router-dom"
import { useFormik } from 'formik'
import { Form, Row, Col, Button } from 'react-bootstrap'

import { PAGE_ROUTES } from '../page-config'
import { ROUTE } from '../../routes'

export const AddStudentForm = () => {

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      schoolName: '',
      isLicensed: false
    },
    onSubmit: async values => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      }
      const result = await fetch(ROUTE.ADD_STUDENT, requestOptions)
      if (result.ok) {
        // notify the user of success? should be some kind of UX feedback here
        navigate(PAGE_ROUTES.STUDENT_GRID)
      } else {
        // notify user of failure
      }
    }

  })
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row>
        <Col>
          <Form.Group className='mb-3'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              id='firstName'
              name='firstName'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className='mb-3'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              id='lastName'
              name='lastName'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className='mb-3'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              id='username'
              name='username'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.username}
            />
          </Form.Group>

        </Col>
        <Col>
          <Form.Group className='mb-3'>
            <Form.Label>School Name</Form.Label>
            <Form.Control
              id='schoolName'
              name='schoolName'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.schoolName}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className='mb-3' style={{ display: 'flex'}}>
            <Form.Label>License?</Form.Label>&nbsp;
            <Form.Check
              id='isLicensed'
              name='isLicensed'
              type='checkbox'
              onChange={formik.handleChange}
              value={formik.values.isLicensed}
            />
          </Form.Group>
        </Col>

        <Col style={{ display: 'flex', justifyContent: 'right'}}>
          <Button type='submit' style={{ width: '180px'}}> Submit</Button>
        </Col>
      </Row>
    </Form >
  )
}