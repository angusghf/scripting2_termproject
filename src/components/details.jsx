import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";


function Details() {

    const { id } = useParams();
    const [characters, setCharacters] = useState(null);

    useEffect(() => {

        // console.log("this is a movie page, the id in the URL is")
        fetch(`https://rickandmortyapi.com/api/character/${id}`)

            .then(response => response.json())
            .then(data => setCharacters(data));

    }, []);

    if (!characters) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>This is a page about a R&M character!</h1>
            <div className="w-72 h-auto">
                {/* Display character image and name */}
                <img src={characters.image} alt={characters.name} />
            </div>
            {/* Descriptive info */}
            <p><strong>Species:</strong> {characters.species}</p>
            <p><strong>Status:</strong> {characters.status}</p>
            <Link to="/">Return to List</Link>
        </div>
    )
}

export default Details;