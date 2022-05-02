import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css'

import { PAGE_ROUTES } from "./pages/page-config"

const StudentGridPage = React.lazy(() => import('./pages/student-grid/student-grid-page'))
const AddStudentPage = React.lazy(() => import( './pages/add-student/add-student-page'))

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PAGE_ROUTES.STUDENT_GRID} element={
          <React.Suspense>
            <StudentGridPage />
          </React.Suspense>}
        />
        <Route path={PAGE_ROUTES.ADD_STUDENT} element={
          <React.Suspense>
            <AddStudentPage />
          </React.Suspense>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
