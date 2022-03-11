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
        <div >
            <div className='links-container'>
            <NavLink to='/' style={{ textDecoration: 'none' }}>
                Home
            </NavLink>
            <br></br>
            <NavLink to='/api/notes' style={{ textDecoration: 'none' }}>
                Notes
            </NavLink>
            <br></br>
            <NavLink to='/api/notebooks' style={{ textDecoration: 'none' }}>
                Notebooks
            </NavLink>
                <ProfileButton user={sessionUser}/>
            </div>
         </div>
        )
    } else {
        sessionLinks = (
        <div className='logins'>
            <NavLink to='/login' style={{ textDecoration: 'none' }}>
                Login
            </NavLink>
            <br></br>
            <NavLink to='/signup' style={{ textDecoration: 'none' }}>
                Sign up
            </NavLink>
        </div>
        )
    }
    return (
        <div>
        <ul>
        <h2>Noti-Ty</h2>
            <li>
            {isLoaded && sessionLinks}
            </li>
        </ul>
        </div>
    )
}

export default Navigation;
