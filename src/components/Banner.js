import React, { useEffect, useState } from "react";
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import "./Banner.css";
import categories, { getMovies } from "../api";

function Banner() {
    const [movie, setMovie] = useState(null);

    const fetchRandomMovie = async () => {
        try {
            console.log("Lista de categorias disponíveis:", categories);

            if (!categories || categories.length === 0) {
                console.error("A lista de categorias está vazia ou não carregou!");
                return;
            }

            const netflixOriginalsCategory = categories.find(
                (category) => category.name === "netflixOriginals"
            );

            if (!netflixOriginalsCategory) {
                console.error("Categoria 'netflixOriginals' não encontrada!");
                return;
            }

            console.log("Categoria encontrada:", netflixOriginalsCategory);

            const data = await getMovies(netflixOriginalsCategory.path);
            console.log("Dados retornados da API:", data);

            const movies = data?.results;
            if (movies?.length > 0) {
                const randomIndex = Math.floor(Math.random() * movies.length);
                const selectedMovie = movies[randomIndex];

                console.log("Filme selecionado:", selectedMovie);
                setMovie(selectedMovie);
            }
        } catch (error) {
            console.error("Banner fetchRandomMovie error:", error);
        }
    };

    useEffect(() => {
        fetchRandomMovie();
    }, []);

    function truncate(str, n) {
        return str?.length > n ? str.substring(0, n - 1) + "..." : str;
    }

    return (
        <header
            className="banner-container"
            style={{
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundImage: movie?.backdrop_path
                    ? `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`
                    : movie?.poster_path
                    ? `url("https://image.tmdb.org/t/p/original/${movie.poster_path}")`
                    : "none",
            }}
        >
            {!movie?.backdrop_path && <p>Carregando...</p>}

            <div className="banner-content">
                <h1 className="banner-title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner-description">
                    <p>{truncate(movie?.overview, 180)}</p>
                </div>
                <div className="banner-buttons-container">
                    <button className="banner-button">
                        <FaPlay /> Assistir
                    </button>
                    <button className="banner-button">
                        <FaInfoCircle /> Mais informações
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Banner;
