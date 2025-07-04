import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import MainLayout from "./components/mainLayout/MainLayout";
import Home from "./components/home/Home";
import FlightSchool from "./components/flightSchool/FlightSchool";
import Courses from "./components/courses/Courses";
import Faq from "./components/faq/Faq";


function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/escuela" element={<FlightSchool/>}/>
        <Route path="/cursos" element={<Courses/>}/>
        <Route path="/faq" element={<Faq/>}/>
      </Route>
    </Routes>
  )
}

export default App
