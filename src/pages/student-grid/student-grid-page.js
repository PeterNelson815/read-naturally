import React from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { PAGE_ROUTES } from '../page-config'
import { StudentGrid } from './student-grid'

export const StudentGridPage = () => {
  return (
    <Container>
      <Card>
        <Card.Header>
          <Row>
            <Col style={{ display: 'flex', alignItems: 'center' }}>
              <Link to={PAGE_ROUTES.ADD_STUDENT}>Add Student</Link>
            </Col>
            <Col>
              <h1>Student List</h1>
            </Col>
            <Col />
          </Row>
        </Card.Header>
      <Card.Body>
        <StudentGrid />
      </Card.Body>
      </Card>
    </Container>
  )
}