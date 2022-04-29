import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import { StudentGridPage } from './pages/student-grid/student-grid-page'
import { AddStudentPage } from './pages/add-student/add-student-page'
import { PAGE_ROUTES } from "./pages/page-config"

// TODO - delete all localStorage use; only for testing before database implemented
if (!localStorage.getItem('localRowData')) {
  localStorage.setItem('localRowData', JSON.stringify([
    { firstName: 'Peter', lastName: 'Nelson', username: 'Longstride', schoolName: 'Maple Grove Senior High', isLicensed: true },
    { firstName: 'And', lastName: 'Three', username: 'Scrafty', schoolName: 'Maple Grove Senior High', isLicensed: true },
    { firstName: 'Then', lastName: 'Alana', username: 'Ferroseed', schoolName: 'Maple Grove Senior High', isLicensed: true },
    { firstName: 'After', lastName: 'Mundi', username: 'Articuno', schoolName: 'Maple Grove Senior High', isLicensed: true },
    { firstName: 'Number', lastName: 'Two', username: 'Panda', schoolName: 'Maple Grove Senior High', isLicensed: true }
  ]))
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PAGE_ROUTES.STUDENT_GRID} element={<StudentGridPage />} />
        <Route path={PAGE_ROUTES.ADD_STUDENT} element={<AddStudentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
