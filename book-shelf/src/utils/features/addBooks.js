import { createSlice } from "@reduxjs/toolkit";
import books from '../Data/bookData'

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: books
  },
  reducers: {
    addItem: (state, action) => {
      state.books.push(action.payload.newOBJ)
      console.log(action.payload.newOBJ)
    },

    bookmartIT: (state, action) => {
      const id = action.payload.hehe
      state.books = state.books.map(book => book.id == id ? { ...book, is_bookmarked: !book.is_bookmarked } : book)
    }
  }
})

export const {addItem,  bookmartIT} = booksSlice.actions
export default booksSlice.reducer 