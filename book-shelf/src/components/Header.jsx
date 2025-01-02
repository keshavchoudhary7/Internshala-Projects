import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import '../assets/styles/header.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header id='header' className='header'>
      <div className='logoDiv'>
        <Link to={'/'} className='companName'>BOOKSHELF</Link>
      </div>
      <div className={`navLink ${isMenuOpen ? 'open' : ''}`}>
        <Link to={'/'} className='home'>Home</Link>
        <Link to={'/Browse'} className='browse'>Browse</Link>
        <Link to={'/Addbooks'} className='add_books'>Add Books</Link>
        <Link to={'/Wishlist'} className='wishlist'>Wishlist</Link>
      </div>
      <div className="burgerIcon">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="menu-icon">
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
    </header>
  )
}
