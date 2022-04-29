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
    { firstName: 'Peter', lastName: 'Nelson', username: 'Longstride', schoolname: 'Maple Grove Senior High', license: 'False' },
    { firstName: 'And', lastName: 'Three', username: 'Scrafty', schoolname: 'Maple Grove Senior High', license: 'False' },
    { firstName: 'Then', lastName: 'Alana', username: 'Ferroseed', schoolname: 'Maple Grove Senior High', license: 'False' },
    { firstName: 'After', lastName: 'Mundi', username: 'Articuno', schoolname: 'Maple Grove Senior High', license: 'False' },
    { firstName: 'Number', lastName: 'Two', username: 'Panda', schoolname: 'Maple Grove Senior High', license: 'False' }
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
