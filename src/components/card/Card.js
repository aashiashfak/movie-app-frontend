// Card.js
import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {addToWatchlist, removeFromWatchlist} from "../../redux/userReducer";
import "./Card.css";

function Card() {
  const [movies, setMovies] = useState([]);
  const watchlist = useSelector((state) => state.user.watchlist);
  const dispatch = useDispatch();
  
  const getMovies = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        console.log("hai")
        setMovies(json.results);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  };

  useEffect(() => {
    getMovies();
  }, []);

  const toggleWatchlist = (movie) => {
    if (watchlist.find((item) => item.id === movie.id)) {
      dispatch(removeFromWatchlist(movie.id));
    } else {
      dispatch(addToWatchlist(movie));
      console.log(movie)
    }
  };

  return (
    <div className="movie-container">
      {movies.map((movie) => (
        <div
          className="movie-card"
          key={movie.id}
          style={{backgroundColor: "#151111"}}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
          />
          <h2 className="movie-title">{movie.title}</h2>
          <div className="movie-info">
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
            <p>Popularity: {movie.popularity}</p>
          </div>
          <button
            className={`watchlist-button ${
              watchlist.find((item) => item.id === movie.id) ? "added" : ""
            }`}
            onClick={() => toggleWatchlist(movie)}
          >
            {watchlist.find((item) => item.id === movie.id) ? "✓" : "+"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Card;
