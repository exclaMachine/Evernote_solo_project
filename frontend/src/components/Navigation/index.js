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
            <div>
                <NavLink to='/'>
                Home
            </NavLink>
            <br></br>
            <NavLink to='/api/notes'>
                Notes
            </NavLink>
            <br></br>
            <NavLink to='/api/notebooks'>
                Notebooks
            </NavLink>
                <ProfileButton user={sessionUser}/>
            </div>
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
            {isLoaded && sessionLinks}
            </li>
        </ul>
    )
}

export default Navigation;
