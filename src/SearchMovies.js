import React, {useState} from 'react';
import MoviesList from './MoviesList';

export default function SearchMovies() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const searchMovies = async (event) => {
        event.preventDefault();
        
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            setMovies(data.results);
        } catch(err) {
            console.log(err);
        }
    }
    
    return (
        <>
            <form className="form" onSubmit={searchMovies} >
                <label className="label" htmlFor="query" >Search Movies</label>
                <input className="input" type="text" name="query" placeholder="Movie Title" onChange={(event) => setQuery(event.target.value)} value={query} ></input>
                <button className="button" type="submit" >Search</button>
            </form>
            <div className="card-list" >
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <MoviesList movie={movie} key={movie.id} />
                ))}
            </div>
        </>
    )
}