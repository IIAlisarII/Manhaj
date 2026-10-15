import './App.css'
import Navbar from './components/NavBar'
import { GiHamburgerMenu } from "react-icons/gi";

function App() {
  return(
    <div className="App">
      <h1> <GiHamburgerMenu/></h1>
      <h2>
      <Navbar />
      </h2>
   </div>
  );
}

export default App
