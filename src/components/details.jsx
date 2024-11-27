import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";


function Details() {

    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {

        // console.log("this is a movie page, the id in the URL is")
        fetch(`https://ghibliapi.vercel.app/films/${id}`)
            .then(response => response.json())
            .then(dataObj => setMovie(dataObj));

    }, []);

    if (!movie) {
        return <div>Loading...</div>
    }

    return (
        <div>
        // <h1>This is a page about a movie!</h1>
            <h1>{movie.title}</h1>
            <p>{movie.description}</p>
            <p><strong>Director:</strong>{movie.director}</p>
            <p><strong>Producer:</strong>{movie.producer}</p>
            <p><strong>Rotten Tomatoes Score:</strong>{movie.rt_score}</p>
            <Link to="/">Return to List</Link>
        </div>
    )
}

export default Details;