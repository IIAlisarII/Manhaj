import './App.css';
import Navbar from './components/NavBar';
import { GiHamburgerMenu } from "react-icons/gi";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from 'react';
import Home from "./pages/Home"
import MyWeek from "./pages/MyWeek"
import Growth from "./pages/Growth"
import Opportunities from "./pages/Opportunities"
import Profile from "./pages/Profile"
import { mockStudents } from "./Data";



function App() {
  const [ showNav, setShowNav ] = useState(false);
  const [ studentId, setStudentId ] = useState(mockStudents[0].id);
  return(
    <Router>
        <h1 className="topbar">
          <GiHamburgerMenu onClick={()=> setShowNav(!showNav)}/>
          <span className="topbar-right">
            Student:
            <select value={studentId} onChange={(e) => setStudentId(e.target.value)}>
              {mockStudents.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </span>
        </h1>
        <Navbar show={showNav} />
    <div className='main'>
      <Routes>
        <Route path="/pages/Home" exact={true} element={<Home/>}/>
        <Route path="/pages/MyWeek" exact={true} element={<MyWeek key={studentId} studentId={studentId}/>}/>
        <Route path="/pages/Growth" exact={true} element={<Growth key={studentId} studentId={studentId}/>}/>

        <Route path="/pages/Opportunities" exact={true} element={<Opportunities/>}/>
        <Route path="/pages/Profile" exact={true} element={<Profile key={studentId} studentId={studentId}/>}/>
        </Routes>
    </div>
   </Router>
  );
}

export default App;
