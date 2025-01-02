  import React, {useState, useEffect} from 'react'
import '../assets/styles/browse.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import BrowseBcard from './BrowseBcard'

export default function Browse() {
  const AllBooks =  useSelector(state => state.books.books);
  const [boxIsOpen, setBoxIsOpen] = useState(false)
  const [valu, setValu] = useState('')

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const highlightedBookId = queryParams.get('Highlight');
  useEffect(() => {
    if(highlightedBookId){
      document.getElementById(highlightedBookId).scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [])

  return (
    <>
      <a className="arrow-upwards" href="#header">
      <div>
        <i className="fa-solid fa-arrow-up"></i>
      </div>
      </a>
      <div className="searchBar">
        <div className='search-input-container'>
        <input className='search-input' value={valu} onChange={(e) => setValu(e.target.value)} type="text" placeholder='Search by Title or Author' />
        </div>
        <div className="browseBar">
          <p onClick={() => setBoxIsOpen(!boxIsOpen)} className='browseClick'>Browse Genres {boxIsOpen ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}</p>
          <div className={boxIsOpen ? 'genreContainer-open' : 'genreContainer-close'}>
            <div className="genresubContainer"><Link className='genreLink' to={'/genre/Fiction'}>Fiction</Link></div>
            <div className="genresubContainer"><Link className='genreLink' to={'/genre/Romance'}>Romance</Link></div>
            <div className="genresubContainer"><Link className='genreLink' to={'/genre/Science Fiction'}>Sci-Fi</Link></div>
            <div className="genresubContainer"><Link className='genreLink' to={'/genre/Mystery'}>Mystery</Link></div>
            <div className="genresubContainer"><Link className='genreLink' to={'/genre/Thriller'}>Thriller</Link></div>
            <div className="genresubContainer"><Link className='genreLink' to={'/genre/Historical'}>Historical</Link></div>
            <div className="genresubContainer"><Link className='genreLink' to={'/genre/Fantasy'}>Fantasy</Link></div>
            <div className="genresubContainer"><Link className='genreLink' to={'/genre/Dystopian'}>Dystopian</Link></div>
            <div className="genresubContainer"><Link className='genreLink' to={'/genre/Adventure'}>Adventure</Link></div>
            <div className="genresubContainer"><Link className='genreLink' to={'/genre/Horror'}>Horror</Link></div>
          </div>
      </div>
      </div>
      <div className='browseSection'>
        <div className="LotBooks">
          {AllBooks
            .filter(book => book.title.toLowerCase().includes(valu.toLowerCase()) || book.author.toLowerCase().includes(valu.toLowerCase()))
            .map(book => <BrowseBcard highli={book.id == highlightedBookId ? true : false} key={book.id} id={book.id} is_bookmarked={book.is_bookmarked} src={book.image_url} pages={book.pages} alt={book.title} title={book.title} author={book.author} rating={book.rating} language={book.language}/>)}
        </div>
      </div>
    </>
  )
}
