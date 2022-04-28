import './App.css'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import { StudentGridPage } from './pages/student-grid/student-grid-page'
import { AddStudentPage } from './pages/add-student/add-student-page'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/student-grid-page/' element={<StudentGridPage />} />
        <Route path='/add-student' element={<AddStudentPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
