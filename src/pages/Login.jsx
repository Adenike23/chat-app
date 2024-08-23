import React, { useEffect, useState } from 'react'
import { useAuth } from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const {user} = useAuth()
    const navigate = useNavigate()
    
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
       if(user) {
        navigate('/')
       }
    }, [])

    const handleInputChange = (value, identifier) => {
        setCredentials(prevValues => ({...prevValues, [identifier]: value}))
        console.log(credentials);
        
    }
    
  return (
    <div className='auth--container'>
      <div className='form--wrapper'>
        <form action="">
            <div className='field--wrapper'>
                <label htmlFor="Email"></label>
                <input type='email' name='email' placeholder='Enter your email...' value={credentials.email} onChange={(e) => handleInputChange(e.target.value, 'email')} required />
            </div>
            <div className='field--wrapper'>
                <label htmlFor="Password"></label>
                <input type='password' name='password' placeholder='Enter password...' value={credentials.password} onChange={(e) => handleInputChange(e.target.value, 'password')} required />
            </div>
            <div className='field--wrapper'>
                <input type='submit' value='Login' className='btn btn--lg btn--main' />
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login
