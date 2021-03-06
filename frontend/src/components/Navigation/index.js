import React from 'react';
import { NavLink } from "react-router-dom"
import ProfileButton from "./ProfileButton"
import { useSelector } from 'react-redux'
import './Navigation.css'
import SearchBar from '../Searchbar';

const Navigation = ({isLoaded}) => {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
        <div>
            <div className='profile-button'><ProfileButton user={sessionUser}/></div>
            <div >
                <div className='links-container'>
                <NavLink to='/' exact={true} className='navlink' activeClassName='active'>
                    Home
                </NavLink>
                <br></br>
                <NavLink to='/api/notes' className='navlink' activeClassName='active'>
                    Notes
                </NavLink>
                <br></br>
                <NavLink to='/api/notebooks' className='navlink' activeClassName='active'>
                    Notebooks
                </NavLink>
                </div>
            </div>
         </div>
        )
    } else {
        sessionLinks = (
        <div className='logins'>
            <NavLink to='/login' className='navlink'>
                Login
            </NavLink>
            <br></br>
            <NavLink to='/signup' className='navlink'>
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
