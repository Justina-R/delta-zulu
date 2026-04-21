import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import MainLayout from "./components/mainLayout/MainLayout";
import Home from "./components/welcomeSite/home/Home";
import FlightSchool from "./components/welcomeSite/flightSchool/FlightSchool";
import Courses from "./components/welcomeSite/courses/Courses";
import Faq from "./components/welcomeSite/faq/Faq";
import Contact from "./components/welcomeSite/contact/Contact";
import Login from "./components/welcomeSite/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import StudentsView from "./components/dashboard/students/studentsView/StudentsView"
import ExamView from "./components/dashboard/exams/examView/ExamView";
import ExamForm from "./components/dashboard/exams/examForm/ExamForm";
import CoursesView from "./components/dashboard/courses/coursesView/CoursesView";
import StudentForm from "./components/dashboard/students/studentForm/StudentForm";
import ModuleForm from "./components/dashboard/courses/moduleForm/ModuleForm";
import MyCourses from "./components/trainingCenter/myCourses/MyCourses";
import CourseDetail from "./components/trainingCenter/courseDetail/CourseDetail";
import StudentExamView from "./components/trainingCenter/studentExamView/StudentExamView";


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
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/students" element={<StudentsView/>}/>
        <Route path="/exams" element={<ExamView/>}/>
        <Route path="/examForm" element={<ExamForm/>}/>
        <Route path="/courses" element={<CoursesView/>}/>
        <Route path="/studentForm" element={<StudentForm/>}/>
        <Route path="/studentForm/:id" element={<StudentForm />} />
        <Route path="/moduleForm" element={<ModuleForm/>}/>
        <Route path="/myCourses" element={<MyCourses/>}/>
        <Route path="/courseDetail" element={<CourseDetail/>}/>
        <Route path="/studentExamView" element={<StudentExamView/>}/>
      </Route>
      
    </Routes>
  )
}

export default App
