import { useState } from "react";
import React from "react";
import './App.css'

function Movie( { movie } ) {
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} />
      <h2>{movie.Title}</h2>
      <p>{movie.Year}</p>
    </div>
  );
}

function App() {
  const [search, setSearch] = useState('')
  const [movies, setMovies] = useState([])
  const apiKey = 'a39e780'

  const fetchMovies = async () => {
    if ((!search.trim())) return;
    try {
      const response = await fetch(`http://www.omdbapi.com/?s=${search}&apikey=${apiKey}`)
    
    const data = await response.json();
    if (data.Response === "True") {
      setMovies(data.Search);
    }
    else {
      alert("No Movies Found")
    }
  } catch (e) {
    console.error(e);
  }
  }
  return (
    <div className="App">
      <h1>Search Movies</h1>
      <input placeholder="Search" onChange={(e) => setSearch(e.target.value)} value={search} />
      <button onClick={fetchMovies}>Search</button>
      <div className="movies">
        {movies.map((movie) => (<Movie key={movie.imdbID} movie={movie} />))}
      </div>
      </div>
  )
}

export default App