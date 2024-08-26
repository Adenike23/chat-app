import React, { useState } from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'

const Register = () => {
    const { handleRegisterUser } = useAuth()
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password1: '',
        password2: ''
    })
    const handleInputChange = (value, identifier) => {
        setCredentials(prevValues => ({...prevValues, [identifier]: value}))        
    }
  return (
    <div className='auth--container'>
      <div className='form--wrapper'>
        <form onSubmit={(e) => handleRegisterUser(e, credentials)}>
            <div className='field--wrapper'>
                <label htmlFor="Name"></label>
                <input type='text' name='name' placeholder='Enter your name...' value={credentials.name} onChange={(e) => handleInputChange(e.target.value, 'name')} required />
            </div>
            <div className='field--wrapper'>
                <label htmlFor="Email"></label>
                <input type='email' name='email' placeholder='Enter your email...' value={credentials.email} onChange={(e) => handleInputChange(e.target.value, 'email')} required />
            </div>
            <div className='field--wrapper'>
                <label htmlFor="Password"></label>
                <input type='password' name='password1' placeholder='Enter password...' value={credentials.password1} onChange={(e) => handleInputChange(e.target.value, 'password1')} required />
            </div>
            <div className='field--wrapper'>
                <label htmlFor="Confirm password"></label>
                <input type='password' name='password2' placeholder='Confirm passworrd' value={credentials.password2} onChange={(e) => handleInputChange(e.target.value, 'password2')} required />
            </div>
            <div className='field--wrapper'>
                <input type='submit' value='Register' className='btn btn--lg btn--main' />
            </div>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default Register
