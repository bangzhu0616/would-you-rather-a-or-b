import React from 'react'
import { NavLink } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <h2>Oops!! Page Not Found. Error 404</h2>
      <NavLink to='/' exact>
          Back to Home
      </NavLink>
    </div>
  )
}

export default NotFound;