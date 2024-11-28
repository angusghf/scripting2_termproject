import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";


function Details() {

    const { id } = useParams();
    const [characters, setCharacters] = useState(null);

    useEffect(() => {

        // console.log("this is a movie page, the id in the URL is")
        fetch(`https://rickandmortyapi.com/api/character${id}`)

            .then(response => response.json())
            .then(data => setCharacters(data));

    }, []);

    if (!characters) {
        return <div>Loading...</div>
    }

    return (
        <div>
        <h1>This is a page about a R&M!</h1>
        <h1>{character.title}</h1>
            <p>{character.description}</p>
            <p><strong>Director:</strong>{character.director}</p>
            <Link to="/">Return to List</Link>
        </div>
    )
}

export default Details;