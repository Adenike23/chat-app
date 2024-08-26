import React from 'react'
import { useAuth } from '../utils/AuthContext'
import { LogOut } from 'react-feather'

const Header = () => {
    const {user, handleUserLogOut} = useAuth()
  return (
    <div id='header--wrapper'>
      {user ? <>Welcome, {user.name} <LogOut className='header--link' onClick={handleUserLogOut}/></> : <button>Login</button>}
    </div>
  )
}

export default Header
