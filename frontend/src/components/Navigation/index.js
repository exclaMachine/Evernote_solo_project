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
         </div>
        )
    } else {
        sessionLinks = (
        <div className='logins'>
            <NavLink to='/login'>
                Login
            </NavLink>
            <br></br>
            <NavLink to='/signup'>
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
