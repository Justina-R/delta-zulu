import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import MainLayout from "./components/welcomeSite/mainLayout/MainLayout";
import Home from "./components/welcomeSite/home/Home";
import FlightSchool from "./components/welcomeSite/flightSchool/FlightSchool";
import Courses from "./components/welcomeSite/courses/Courses";
import Faq from "./components/welcomeSite/faq/Faq";
import Contact from "./components/welcomeSite/contact/Contact";
import Login from "./components/welcomeSite/login/Login";
import MainLayoutTC from "./components/trainingCenter/mainLayoutTC/MainLayoutTC";
import Dashboard from "./components/dashboard/dashboard/Dashboard";
import StudentsView from "./components/dashboard/studentsView/StudentsView"
import ExamViews from "./components/dashboard/examViews/ExamViews";
import ExamForm from "./components/dashboard/examForm/ExamForm";
import CoursesView from "./components/dashboard/coursesView/CoursesView";
import StudentForm from "./components/dashboard/studentForm/StudentForm";
import ModuleForm from "./components/dashboard/moduleForm/ModuleForm";


function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/escuela" element={<FlightSchool/>}/>
        <Route path="/cursos" element={<Courses/>}/>
        <Route path="/faq" element={<Faq/>}/>
        <Route path="/contacto" element={<Contact/>}/>
        <Route path="/login" element={<Login/>}/>
      </Route>

      <Route element={<MainLayoutTC />}>
        <Route path="/trainingCenter" element={<Dashboard/>}/>
        <Route path="/students" element={<StudentsView/>}/>
        <Route path="/exams" element={<ExamViews/>}/>
        <Route path="/examForm" element={<ExamForm/>}/>
        <Route path="/courses" element={<CoursesView/>}/>
        <Route path="/studentForm" element={<StudentForm/>}/>
        <Route path="/moduleForm" element={<ModuleForm/>}/>
      </Route>
      
    </Routes>
  )
}

export default App
