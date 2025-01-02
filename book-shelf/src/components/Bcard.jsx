import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/bcard.css';

// Store import
import { useDispatch, useSelector } from 'react-redux';
import { addItem, bookmartIT } from '../utils/features/addBooks';

export default function Bcard(Props) {
  const dispatch = useDispatch();

  function handleBookmark() {
    dispatch(bookmartIT({ id: Props.id }));
  }

  return (
    <div className="bcard">
      <div className="book_img">
        <img src={Props.src} alt={`${Props.title} image`} />
        <div className="books_buttons">
          <p className="squareArrow">
            <Link className="squareArr" to={`/book/${Props.title}`}>
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </Link>
          </p>
          <p onClick={handleBookmark} className={Props.is_bookmarked ? 'heart_clicked' : 'heart'}>
            {Props.is_bookmarked ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
          </p>
        </div>
      </div>
      <div className="book_details">
        <h1 className="book_title">{Props.title}</h1>
        <p className="book_author">{Props.author}</p>
        <p className="book_rating">
          Rating: <span className="actual_rating">{Props.rating}</span>
        </p>
        <p className="book_desc">{Props.desc}</p>
      </div>
    </div>
  );
}
