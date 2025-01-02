import React from 'react'
import Bcard from './Bcard'
import ErrorPage from './ErrorPage.jsx'
import '../assets/styles/genre.css'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../utils/features/addBooks'
import { useParams } from 'react-router-dom'
import { genreDesc } from '../utils/Data/genreDesc'

export default function Genre() {
  const {genre} = useParams()
  const genreCapital = genre.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').trim();
  const genrebooks =  useSelector(state => state.books.books);
  const genreFilteredBooks = genrebooks.filter(book => book.genre.includes(genreCapital))

  const description = genreDesc.filter(genreInfo =>  genreInfo.genre.toLowerCase() == genre.toLowerCase())[0]

  return (
    <div className='genreSection'>
      {genreFilteredBooks.length > 0 ? (<>
      <div className="genreDetails">
        <h1 className='genreHead'>{genre}</h1>
        <p className='genreText'>{description ? description.desc : ''}</p>
      </div>
      <div className="genreBooks">
        {genreFilteredBooks.map((book) => <Bcard key={book.id} id={book.id} is_bookmarked={book.is_bookmarked} src={book.image_url} alt={book.title} title={book.title} author={book.author} rating={book.rating} desc={book.description}/>)}
      </div></>) : <ErrorPage/>}
    </div>
  )
}
