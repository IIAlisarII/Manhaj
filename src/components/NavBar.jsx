import Logotemp from '../assets/Logotemp.png';
import { Link } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaArrowTrendUp } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";


const NavBar = ({show}) => {
  return (
    <div className = {show ? "sidenav active" : "sidenav"}>
        <img src={Logotemp} alt="Logo" className="Logotemp" />
        <ul>
            <li><Link to="/pages/Home">
                <IoHomeSharp />
                Home
            </Link></li>
            <li><Link to="/pages/MyWeek">
                <AiOutlineSchedule />
                My Week
            </Link></li>
            <li><Link to="/pages/Growth">
                <FaArrowTrendUp />
                Growth
            </Link></li>
            <li><Link to="/pages/Opportunities">
                <CiStar />
                Opportunities
            </Link></li>
            <li><Link to="/pages/profile">
                <IoPerson />
                Profile
            </Link></li>
            
        </ul>
    </div>  
    );
}

export default NavBar;