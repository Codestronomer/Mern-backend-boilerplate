import { Home } from "@mui/icons-material";
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

    const location = useLocation();
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" color="inherit">
                    MERN Skeleton
                </Typography>
                <Link to="/">
                    <IconButton lebel="Home" style={isActiveStyles(location, "/")}>
                        <Home />
                    </IconButton>
                </Link>
                <Link to="/users">
                    <Button style={isActiveStyles(location, "/users")}>Users</Button>
                </Link>
                {
                    !auth.isAuthenticated() && (
                        <span>
                            <Link to="/signup">
                                <Button style={isActiveStyles(location, "/signup")} >Sign up</Button>
                            </Link>
                            <Link to="/signin">
                                <Button style={isActiveStyles(location, "/signin")}>Sign in</Button>
                            </Link>

                        </span>
                    )
                }

                {
                    auth.isAuthenticated() && (
                        <span>
                            <Link to={`/user/${auth.isAuthenticated().user._id}`}>
                                <Button style={isActiveStyles(location, `/user/${auth.isAuthenticated().user._id}`)}>My Profile</Button>
                            </Link>
                            <Button color="inherit" onClick={() => { auth.clearJWT(() => history.push('/')) }}>Signout</Button>
                        </span>
                    )
                }
            </Toolbar>
        </AppBar>
    )
};

export default Menu

