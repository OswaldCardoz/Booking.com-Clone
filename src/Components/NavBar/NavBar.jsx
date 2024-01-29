

import React, { useContext,useState }  from 'react'
import './navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faPlane } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../App';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Menu, MenuItem } from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';


function Navbar(){
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const userName = JSON.parse(localStorage.getItem("loginUserDetails"));


  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    if (anchorEl) {
      // If the menu is already open, close it
      handleMenuClose();
    } else {
      // If the menu is closed, open it
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate('/profile');
  };

  const handleMyTripsClick = () => {
    handleMenuClose();
    navigate('/mytravels');
  };

  const handleLogout = () => {
    handleMenuClose();
    // Add your logout logic here
    localStorage.clear();
    // setShowProfileModal(false);
    setIsLoggedIn(false);
    navigate('/login');
  };


  return (
    <nav id='navbar' className='parent-container'>

      <div className='child-container nav-container'>

        <div id='reg-div'>

          <span id='booking-logo'>
            <NavLink to="/"><h2>Booking.com</h2></NavLink>
          </span>

{ isLoggedIn?<div className='profile-icon-container' onClick={handleMenuOpen}>

{/* <FontAwesomeIcon  icon={faUser} onClick={toggleProfileModal} /> */}

<span style={{display:"flex",alignItems:"center"}}><AccountCircleIcon id='user-icon'/>{userName.name}</span>

<Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {/* <MenuItem onClick={handleProfileClick}>Profile</MenuItem> */}
                <MenuItem onClick={handleMyTripsClick}>My Travels</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>

</div>
:

     
            <div id='btn-container'>
              <button className='reg-btn' onClick={() => navigate('/register')}>Register</button>
              <button className='reg-btn' onClick={() => navigate('/login')}>Sign in</button>
            </div>

}
        </div>

        <nav id='navigation-Links'>
          <ul id='links-container'>
            <li><NavLink to="/"><FontAwesomeIcon icon={faBed} /> Stays</NavLink></li>
            <li><NavLink to="/flights"><FontAwesomeIcon icon={faPlane} /> Flights</NavLink></li>
          </ul>
        </nav>

      </div>



    </nav>
  )
}
export default Navbar;