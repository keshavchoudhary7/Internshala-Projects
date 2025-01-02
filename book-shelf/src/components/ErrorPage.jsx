import React from 'react'
import '../assets/styles/ErrorPage.css'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div className='ErrorPage'>
      <div className="ErrorContent">
        <h1 className='errorCode'>404</h1>
        <p className='errorMessage'>Oops! The page you're looking for doesn't exist.</p>
        <p className='backHome'>
          <Link to={'/'} className="backHomeLink">Go back to Home</Link>
        </p>
      </div>
    </div>
  )
}
