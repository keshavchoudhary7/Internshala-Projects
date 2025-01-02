import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../utils/features/addBooks';

// Load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.error('Could not load state', e);
    return undefined;
  }
};

// Save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (e) {
    console.error('Could not save state', e);
  }
};

const persistedState = loadState();

// Create the store with persisted state
export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
  preloadedState: persistedState, 
});

// Save state to local storage on every change
store.subscribe(() => {
  saveState({
    books: store.getState().books, 
  });
});
