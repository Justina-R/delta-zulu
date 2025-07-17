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
import Dashboard from "./components/trainingCenter/dashboard/Dashboard";



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
        <Route path="/trainingCenter" element={<Dashboard/>}/>
      </Route>
    </Routes>
  )
}

export default App
