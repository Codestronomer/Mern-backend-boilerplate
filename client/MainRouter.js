import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Users from './user/Users'
import Signin from './auth/Signin'
import Profile from './user/Profile'

const MainRouter = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/user/:userId" element={Profile} />
            </Routes>
        </div>
    )
}

export default MainRouter