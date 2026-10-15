import Logotemp from '/src/assets/Logotemp.png';


const NavBar = () => {
  return (
    <div className="sidenav active">
        <img src={Logotemp} alt="Logo" className="Logotemp" />
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#">My Week</a></li>
            <li><a href="#">Growth</a></li>
            <li><a href="#">Opprotunities</a></li>
            <li><a href="#">Profile</a></li>
            
        </ul>
    </div>  
    );
}

export default NavBar;