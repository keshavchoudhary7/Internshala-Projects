import React from 'react'
import '../assets/styles/bdetails.css'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, bookmartIT } from '../utils/features/addBooks'
import ErrorPage from './ErrorPage'

export default function Bdetails(Props){
  const {book} = useParams()
  const book1 = book.toLowerCase()
  const AllBook =  useSelector(state => state.books.books);
  const showBook = AllBook.filter(book => book.title.toLowerCase() == book1)[0]
  const books =  useSelector(state => state.books.books);
  const dispatch = useDispatch()
  function handleBookmark(hehe){
    dispatch(bookmartIT({hehe}))
  }

  return (
    showBook ? (<div className='bdetails_section'>
      <button className='backButton' onClick={() => history.back()}>&larr; Back</button>
      <div className="bdetails_info">
        <div className="bdetails_img">
          <img src={showBook.image_url} alt={showBook.title + ' book cover'} />
          <div className="bdetails_buttons">
          <p onClick={() => handleBookmark(showBook.id)} className={showBook.is_bookmarked ? 'heart_clicked_bdetails' : 'heart_bdetails'}>{showBook.is_bookmarked ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}</p>
          </div>
        </div>
        <div className="bdetails_written">
            <div className="bdetails_impo">
              <h1 className='bdetails_title'>{showBook.title}</h1>
              <h3 className='bdetails_author'>{showBook.author}</h3>
            </div>
            <p className='bdetails_pages'><b>Page:&nbsp;&nbsp;&nbsp;</b>{showBook.pages}</p>
            <p className='bdetails_rating'><b>Rating:&nbsp;&nbsp;&nbsp;</b>{showBook.rating}</p>
            <p className='bdetails_Language'><b>Language:&nbsp;&nbsp;&nbsp;</b>{showBook.language} </p>
            <p className='bdetails_format'><b>Format:&nbsp;&nbsp;&nbsp;</b>{showBook.format}</p>
            <p className='bdetails_genres'>
              <b>Genre:&nbsp;&nbsp;&nbsp;</b>
              {showBook.genre.map((gen, index) => <Link to={`/genre/${gen}`} key={index} className='bdetails_genre_child'>{gen}</Link>)}
            </p>
            <p className='bdetails_summary'><b>Summary:&nbsp;&nbsp;&nbsp;</b>{showBook.description}</p>
        </div>
      </div>
    </div>) : <ErrorPage/>
  )
}
