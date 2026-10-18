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



function App() {
  const [ showNav, setShowNav ] = useState(false);
  return(    
    <Router>
        <h1> <GiHamburgerMenu onClick={()=> setShowNav(!showNav)}/></h1>
        <Navbar show={showNav} />
    <div className='main'>
      <Routes>
        <Route path="/pages/Home" exact={true} element={<Home/>}/>
        <Route path="/pages/MyWeek" exact={true} element={<MyWeek/>}/>
        <Route path="/pages/Growth" exact={true} element={<Growth/>}/>

        <Route path="/pages/Opportunities" exact={true} element={<Opportunities/>}/>
        <Route path="/pages/Profile" exact={true} element={<Profile/>}/>
        </Routes>
    </div>
   </Router>
  );
}

export default App;
