import Logotemp from '/src/assets/Logotemp.png';


const NavBar = ({show}) => {
  return (
    <div className = {show ? "sidenav active" : "sidenav"}>
        <img src={Logotemp} alt="Logo" className="Logotemp" />
        <ul>
            <li><a href="pages/Home">Home</a></li>
            <li><a href="/pages/MyWeek">My Week</a></li>
            <li><a href="#">Growth</a></li>
            <li><a href="#">Opprotunities</a></li>
            <li><a href="#">Profile</a></li>
            
        </ul>
    </div>  
    );
}

export default NavBar;