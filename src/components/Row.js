import React, { useEffect, useRef } from 'react';
import { getMovies } from '../api';
import "./Row.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 

const imageHost = "https://image.tmdb.org/t/p/w500/";

function Row({ title, path }) {
  const [movies, setMovies] = React.useState([]);
  const rowRef = useRef(null); 

  const fetchMovies = async (_path) => {
    try {
        const data = await getMovies(_path);
        console.log("data ", data);
        setMovies(data?.results);
    } catch (error) {
        console.log("fetchMovies error: ", error);
    }
  };

  const scroll = (direction) => {
    if (rowRef.current) {
      rowRef.current.scrollLeft += direction * 200; 
    }
  };

  useEffect(() => {
    fetchMovies(path);
  }, [path]);

  return (
    <div className="row-container">
      <h2 className="row-header">{title}</h2>
      <div className="row-left-and-right">
        
        <button className="scroll-arrow scroll-left" onClick={() => scroll(-6)}>
          <FaChevronLeft />  
        </button>
        <div className="row-cards" ref={rowRef}>
          {movies?.map((movie) => {
            return (
              <div className="movie-card" key={movie.id}>
                <img 
                  className="movie-banner"
                  src={`${imageHost}${movie.backdrop_path}`} 
                  alt={movie.name}
                />
              </div>    
            );            
          })}
        </div>
        
        <button className="scroll-arrow scroll-right" onClick={() => scroll(6)}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Row;