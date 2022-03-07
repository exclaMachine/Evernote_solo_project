import React from 'react';
import { NavLink } from "react-router-dom"
import ProfileButton from "./ProfileButton"
import { useSelector } from 'react-redux'
import './Navigation.css'

const Navigation = ({isLoaded}) => {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser}/>
        )
    } else {
        sessionLinks = (
        <>
            <NavLink to='/login'>
                Login
            </NavLink>
            <NavLink to='/signup'>
                Sign up
            </NavLink>
        </>
        )
    }
    return (
        <ul>
            <li>
            <NavLink to='/'>
                Home
            </NavLink>
            <NavLink to='/api/notes'>
                Notes
            </NavLink>
            <NavLink to='/api/notebooks'>
                Notebooks
            </NavLink>
            {isLoaded && sessionLinks}
            </li>
        </ul>
    )
}

export default Navigation;
