import { useState,useEffect } from "react";
import { Link } from "react-router-dom"


function Favorites() {

    const [savedMovies, setSavedMovies] = useState(() => {

        const savedFavs = localStorage.getItem("favs");
        return savedFavs ? JSON.parse(savedFavs) : [];

    });

    useEffect( () => {

        fetch("https://ghibliapi.vercel.app/films")
            .then(response => response.json())
            .then(movies => {
                const favMovies = movies.filter(allMovie => {
                    return savedMovies.includes(allMovie.id);
                })

                setSavedMovies(favMovies);

            });
    }, []);

    return(
        <>
            <h1>These are my favorites!</h1>
            <ul>
                {savedMovies.map( (movie) => (
                    <li key={movie.id}>
                        <Link to={`/movie${movie.id}`}>{movie.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Favorites;