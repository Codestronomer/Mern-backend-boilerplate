import React, { Component, Elem } from 'react';
import { Route, Navigate } from 'react-router-dom';
import auth from './auth-helper';

const PrivateRoute = ({ children }) => {
    return auth.isAuthenticated() ? children : <Navigate to={{ pathname: '/signin', state: { from: props.location }, }} />
}

export default PrivateRoute;