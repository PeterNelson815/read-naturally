import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css'

import { StudentGridPage } from './pages/student-grid/student-grid-page'
import { AddStudentPage } from './pages/add-student/add-student-page'
import { PAGE_ROUTES } from "./pages/page-config"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PAGE_ROUTES.STUDENT_GRID} element={<StudentGridPage />} />
        <Route path={PAGE_ROUTES.ADD_STUDENT} element={<AddStudentPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
