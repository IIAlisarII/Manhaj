import './App.css';
import Navbar from './components/NavBar';
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from 'react';

function App() {
  const [ showNav, setShowNav ] = useState(false);
  return(    <div className="App">
      <h1> <GiHamburgerMenu onClick={()=> setShowNav(!showNav)}/></h1>
      <h2>
      <Navbar show={showNav} />
      </h2>
   </div>
  );
}

export default App;
