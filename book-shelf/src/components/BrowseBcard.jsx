import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../assets/styles/bcard.css'
import '../assets/styles/BrowseBCard.css'

// Store import
import { useDispatch, useSelector } from 'react-redux'
import { addItem, bookmartIT } from '../utils/features/addBooks'

export default function BrowseBcard(Props) {
  const books =  useSelector(state => state.books.books);
  const dispatch = useDispatch()
  function handleBookmark(hehe){
    dispatch(bookmartIT({hehe}))
  }

  return (
    <div id={Props.id} className={Props.highli ? 'BrowsebcardHighlighted' : 'Browsebcard'}>
      <div className="Browse_book_img">
        <img src={Props.src} alt={Props.title + 'image'} />
        <div className="books_buttons">
          <p className='squareArrow'><Link className='squareArr' to={`/book/${Props.title}`}><i className="fa-solid fa-arrow-up-right-from-square"></i></Link></p>
          <p onClick={() => handleBookmark(Props.id)} className={Props.is_bookmarked ? 'heart_clicked' : 'heart'}>{Props.is_bookmarked ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}</p>
        </div>
      </div>
      <div className="book_details">
        <h1 className='book_title'>{Props.title}</h1>
        <p className='book_author'>{Props.author}</p>
        <p className='book_rating'>Rating: {Props.rating}</p>
        <p className='book_page'>Pages: {Props.pages}</p>
        <p className='book_language'>Language: {Props.language}</p>
      </div>
    </div>
  )
}