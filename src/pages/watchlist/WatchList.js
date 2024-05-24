import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {removeFromWatchlist} from "../../redux/userReducer";
import "./Watchlist.css";
import Header from "../../components/header/Header";

function Watchlist() {
  const watchlist = useSelector((state) => state.user.watchlist);
  const dispatch = useDispatch();

  const handleRemove = (movie) => {
    dispatch(removeFromWatchlist(movie.id));
    console.log(movie)
  };

  return (
    <>
      <Header />
      <div className="watchlist-container">
        {watchlist.length > 0 ? (
          watchlist.map((movie) => (
            <div key={movie.id} className="card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h2>{movie.title}</h2>
              <p>{movie.release_date}</p>
              <p>{movie.vote_average}</p>
              <button onClick={() => handleRemove(movie)}>
                Remove from Watchlist
              </button>
            </div>
          ))
        ) : (
          <p style={{color:"white"}}>Your watchlist is empty.</p>
        )}
      </div>
    </>
  );
}

export default Watchlist;
