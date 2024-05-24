// userReducer.js
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  user: null,
  watchlist: [], 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.watchlist = []
    },
    addToWatchlist(state, action) {
      state.watchlist.push(action.payload);
    },
    removeFromWatchlist(state, action) {
      state.watchlist = state.watchlist.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});

export const {setUser, clearUser, addToWatchlist, removeFromWatchlist} =
  userSlice.actions;
export default userSlice.reducer;
