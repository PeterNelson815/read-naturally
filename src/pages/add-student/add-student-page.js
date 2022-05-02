import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Card, Col, Row } from 'react-bootstrap'

import { PAGE_ROUTES } from '../page-config'
import { AddStudentForm } from './add-student-form'

const AddStudentPage = () => {

  return (
    <Container>
      <Card>
        <Card.Header>
          <Row>
            <Col style={{display:'flex', alignItems: 'center'}}>
              <Link to={PAGE_ROUTES.STUDENT_GRID}>Back to Student List</Link>
            </Col>
            <Col>
              <h1>Add A Student</h1>
            </Col>
            <Col />
          </Row>
        </Card.Header>
        <Card.Body>
          <AddStudentForm />
        </Card.Body>
        <Card.Footer>
          <h3 style={{ textAlign: 'right' }}>
          </h3>
        </Card.Footer>
      </Card>
    </Container>
  )
}

export default AddStudentPage
