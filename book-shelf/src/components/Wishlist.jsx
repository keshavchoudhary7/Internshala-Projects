import React from 'react';
import Bcard from './Bcard';
import '../assets/styles/wishlist.css';
import { useDispatch, useSelector } from 'react-redux';
import { bookmartIT } from '../utils/features/addBooks';

export default function Wishlist() {
  const dispatch = useDispatch();
  const majorArray = useSelector(state => state.books.books);
  const wishlistArray = majorArray.filter(book => book.is_bookmarked === true);

  return (
    <div className='wishlistSection'>
      {wishlistArray.length > 0 ? (
        <div>
          <div className="wishlistDetails">
            <h1 className='wishlistHead'>Wishlist</h1>
          </div>
          <div className="wishlistbooks">
            {wishlistArray.map((book) => (
              <Bcard
                key={book.id}
                id={book.id}
                is_bookmarked={book.is_bookmarked}
                src={book.image_url}
                alt={book.title}
                title={book.title}
                author={book.author}
                rating={book.rating}
                desc={book.description}
                toggleBookmark={() => dispatch(bookmartIT({ hehe: book.id }))}
              />
            ))}
          </div>
        </div>
      ) : (
        <h1 className='noWish'>
          Haven't found a favorite yet? Browse through our selection and add books to your wishlist!
        </h1>
      )}
    </div>
  );
}
