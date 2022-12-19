import React from "react";
import { Link as ReactLink } from 'react-router-dom';
import { UserContext } from "./UserContext";
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from "@mui/material/Box";




function NavBar() {

    const { loggedIn, logoutUser } = React.useContext(UserContext)
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
     
    

    return (
        <nav className="navbar navbar-expand-lg py-2 sticky-top navbar-light bg-white">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img className="logo" src={require("../img/bh.png")} alt="" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/donate">Donate Now</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/products">Shop Products</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/involved">Get Involved</a>
                        </li>
                    </ul>
                    {/* <a href="/register" className=" btn btn-primary ms-lg-3">Register</a>
                    <a href="/login" className="btn btn-primary ms-lg-3">Log in</a> */}
                    <Box className="btn btn-primary ms-lg-3"> 
                    <MenuItem
                    to={'/register'}
                    component={ReactLink}
                    onClick={handleCloseUserMenu}
                    >
                    <a textAlign="center">Register</a>
                    </MenuItem> 
                    </Box>
                    <Box className="btn btn-primary ms-lg-3">
                    {
                loggedIn ? 
                  <MenuItem onClick={logoutUser}>
                    <a textAlign="center">Log out</a>
                  </MenuItem> :
                  <MenuItem
                  to={'/login'}
                  component={ReactLink}
                  onClick={handleCloseUserMenu}
                  >
                    <a textAlign="center">Log in</a>
                  </MenuItem> 
              }
                    </Box>
                

                </div>
            </div>
        </nav>
    );
}

export default NavBar;
