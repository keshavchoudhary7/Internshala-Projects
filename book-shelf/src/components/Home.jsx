import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import Bcard from './Bcard'

// CSS import
import '../assets/styles/home.css'

// Store import
import { useDispatch, useSelector } from 'react-redux'
import { addItem, bookmartIT } from '../utils/features/addBooks'

export default function Home() {
  const books =  useSelector(state => state.books.books);
  const dispatch = useDispatch();
  const popularBooks = books.filter(book => book.rating > 4.6).sort(({rating:a}, {rating:b}) => b-a)
  const [client, setClient] = useState('Reader')
  const [val, setVal] = useState('')
  const [flag, setFlag] = useState(true)

  useEffect(() => {
    const clientName = sessionStorage.getItem('name')
    if(clientName){
      setClient(clientName)
      setFlag(true)
    } else {
      setFlag(false)
    }
  }, [])

  function handleNameSubmit(e){
    e.preventDefault();
    if(val != ''){
      setClient(val.trimEnd())
      setFlag(true)
      sessionStorage.setItem('name', val)
    }
  }
  
  return (
    <section className='sectionHome'>
      <div className={flag ? 'askme_disable' : 'askme'}>
        <form className='askme_form' onSubmit={handleNameSubmit}>
          <input className='askme_form_input' onChange={(e) => setVal(e.target.value)} type="text" placeholder='Enter your name'/>
          <button id='submit_button' className= {val ? 'askme_form_button-close' : 'askme_form_button-open'} type="submit">Submit</button>
        </form>
      </div>
      <div className="welcome_message">
        <h1 className='welcome_salutation'>Welcome, {client}! Your Online Book Store!</h1>
        <p className='welcome_text'>Select the books of your choice and embark on a journey of knowledge, adventure, and imagination.</p>
      </div>
      <hr />
      <div className="viewGenre">
        <h1 className='viewText'>Discover Books in Your Favorite <span className='textnameGenre'>Genre</span></h1>
        <div className="genreShoe">
          <Link to={'genre/Mystery'}> <img height={"210"} src='https://i.pinimg.com/736x/c8/3a/87/c83a87bddd82e75562c9d114c2346825.jpg' alt="Mystery" /> </Link>
          <Link to={'genre/Romance'}> <img height={"210"} src='https://cdn.kobo.com/book-images/93659c7d-5d79-4b9d-afce-fdaa56d8e81c/353/569/90/False/best-romance-novels.jpg' alt="Romance" /> </Link>
          <Link to={'genre/Thriller'}> <img height={"210"} src='https://img.freepik.com/premium-photo/word-thriller-lightbox-isolated-red-background-literary-genres_680447-2006.jpg' alt="Thriller" /> </Link>
          <Link to={'genre/Dystopian'}> <img height={"210"} src='https://ik.imagekit.io/kf28wicizj/images/Dystopian.png?updatedAt=1732715824140' alt="Dystopian" /> </Link>
          <Link to={'genre/Horror'}> <img height={"210"} src='https://thumbs.dreamstime.com/b/horror-text-word-bloody-splattered-font-40498314.jpg' alt="Horror" /> </Link>
          <Link to={'genre/Adventure'}> <img height={"210"} src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/ThrillingAdventuresVol2No3.jpg/640px-ThrillingAdventuresVol2No3.jpg' alt="Adventure" /> </Link>
          <Link to={'genre/Crime'}> <img src='https://ik.imagekit.io/kf28wicizj/images/Crime.jpeg?updatedAt=1732715823304' alt="Crime" /> </Link>
          <Link to={'genre/Science Fiction'}> <img height={"210"} src='https://cdn.textstudio.com/text-effect/1013/197e1/SCI-FI.webp' alt="Scifi" /> </Link>
          <Link to={'genre/Fantasy'}> <img height={"210"} src='https://www.shutterstock.com/image-illustration/fantasy-word-3d-text-concept-260nw-740590564.jpg' alt="Fantasy " /> </Link>
          <Link to={'genre/Fiction'}> <img src='https://ik.imagekit.io/kf28wicizj/images/Fiction.png?updatedAt=1732715825336' alt="Fiction" /> </Link>
          <Link to={'genre/Historical'}> <img height={"210"} src='https://img.freepik.com/premium-vector/history-textbook-symbols-icons-school-board_53500-1897.jpg' alt="Historical" /> </Link>
        </div>
      </div>
      <div className="viewPopularity">
        <h1 className='viewText'>Explore Books by <span className='textnamePopular'>Popularity</span></h1>
        <div className="popularBooks">
          {popularBooks.map((book) => <Bcard key={book.id} id={book.id} is_bookmarked={book.is_bookmarked} src={book.image_url} alt={book.title} title={book.title} author={book.author} rating={book.rating} desc={book.description}/>)}
        </div>
      </div>
    </section>
  )
}