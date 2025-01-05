import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    // Stores the search query
    query: '', 
  },
  reducers: {
    setSearchQuery: (state, action) => {
      // Update the query
      state.query = action.payload; 
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
