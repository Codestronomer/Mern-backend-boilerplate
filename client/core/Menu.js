import { FormatUnderlined, Home } from "@mui/icons-material";
import React from 'react';
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate, NavLink, useLocation, matchPath } from "react-router-dom";
import auth from './../auth/auth-helper';



const isActiveStyles = (location, path) => {
    const match = matchPath(location.pathname, path)
    if (match) {
        return { color: '#ff4081' }
    } else {
        return { color: '#ffffff' }
    }
}

const Menu = (props) => {

    const history = useNavigate()
    const location = useLocation();
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" color="inherit">
                    MERN Skeleton
                </Typography>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <IconButton lebel="Home" style={isActiveStyles(location, "/")}>
                        <Home />
                    </IconButton>
                </Link>
                <Link to="/users" style={{ textDecoration: 'none' }}>
                    <Button style={isActiveStyles(location, "/users")}>Users</Button>
                </Link>
                {
                    !auth.isAuthenticated() && (
                        <span>
                            <Link to="/signup" style={{ textDecoration: 'none' }}>
                                <Button style={isActiveStyles(location, "/signup")} >Sign up</Button>
                            </Link>
                            <Link to="/signin" style={{ textDecoration: 'none' }}>
                                <Button style={isActiveStyles(location, "/signin")}>Sign in</Button>
                            </Link>

                        </span>
                    )
                }

                {
                    auth.isAuthenticated() && (
                        <span>
                            <Link to={`/user/${auth.isAuthenticated().user._id}`} style={{ textDecoration: 'none' }}>
                                <Button style={isActiveStyles(location, `/user/${auth.isAuthenticated().user._id}`)}>My Profile</Button>
                            </Link>
                            <Button color="inherit" onClick={() => { auth.clearJWT(() => history('/')) }}>Signout</Button>
                        </span>
                    )
                }
            </Toolbar>
        </AppBar>
    )
};

export default Menu

