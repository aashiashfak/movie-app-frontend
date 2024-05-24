import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {removeFromWatchlist} from "../../redux/userReducer";
import "../../components/card/Card.css";
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
      <div className="movie-container">
        {watchlist.length > 0 ? (
          watchlist.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="card-body">
                <h2 className="movie-title">{movie.title}</h2>
                <div className="movie-info">
                  <p>Release Date: {movie.release_date}</p>
                  <p>Rating: {movie.vote_average}</p>
                  <p>Popularity: {movie.popularity}</p>
                </div>
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemove(movie)}
              >
                Remove from Watchlist
              </button>
            </div>
          ))
        ) : (
          <p style={{color: "white"}}>Your watchlist is empty.</p>
        )}
      </div>
    </>
  );
}

export default Watchlist;
