import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  const demoLogin = (e) => {
    e.preventDefault();
    setErrors([]);
    let demoUser = {
      credential: 'Demo-litionMan',
      password: 'password'
    }
    return dispatch(sessionActions.login(demoUser))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      })
  }

  return (
    <div className='minimal-body'>
      <div className='heading'>
      <h2>Noti-Ty</h2>
      </div>
      <p className="tagline">Remember, everything's important.</p>
    <form className='loginform' onSubmit={handleSubmit}>
      <ul className='errors'>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div className='reg-form label'>
        <label className='label'>
            Username or Email
        <br></br>
            <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            />
        </label>
      <label>
        Password
        <br></br>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      </div>
      <br></br>
      <div className='button-container'>
        <button className='button' type="submit">Log <br></br>In</button>

        <button className='Demo'
        onClick={demoLogin}
        >Demo User</button>
      </div>
    </form>
    </div>
  );
}

export default LoginFormPage;
