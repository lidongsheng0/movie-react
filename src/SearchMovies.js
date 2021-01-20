import React,{ useState } from "react";
import MovieCard from './Movie-card';

export default function SearchMovies() {
  const [query,setQuery] = useState('');

  const [movies,setMovies] = useState([]);

  const [loading,setLoading] = useState(false);

  const handleSubmit = (e)=> {
    e.preventDefault();
    const fetchData = async (query='Terminator')=> {
      if(query==='') {
        query = 'Terminator';
      }
      const url= `https://api.themoviedb.org/3/search/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&query=${query}&page=1&include_adult=false`;
      
      setLoading(true);
      try {
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);

        setMovies(data.results);
        setLoading(false);
      }catch(err) {
        console.error(err);

        setLoading(false);
      }
    }

    fetchData(query);
  }
  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <label className='label' htmlFor='query'>Movie Name</label>
        <input className='input' type='text' name='query'
          placeholder='i.e. Jurassic Park'
          value={query} onChange={(e) => setQuery(e.target.value)}
          />
        <button type='submit' className='button'>Search</button>
      </form>
      {
        loading ? <h1>Loading...</h1> : (
          <div className='card-list'>
            {
              movies.filter(movie => movie.poster_path).map(movie => (
                <MovieCard key={movie.id} movie={movie}/>
              ))
            }
          </div>
        )
      }
    </>
  )
}