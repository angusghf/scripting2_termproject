import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function Details() {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [favs, setFavs] = useState(() => {
        const savedFavs = localStorage.getItem("favs");
        return savedFavs ? JSON.parse(savedFavs) : [];
    });

    // Toggle favorite function
    const toggleFav = (characterID) => {
        let filteredFavs;
        if (favs.includes(characterID)) {
            filteredFavs = favs.filter((favId) => favId !== characterID);
        } else {
            filteredFavs = [...favs, characterID];
        }

        localStorage.setItem("favs", JSON.stringify(filteredFavs));
        setFavs(filteredFavs);
    };

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/${id}`)
            .then(response => response.json())
            .then(data => setCharacter(data))
            .catch((error) => {
                console.log("Error Fetching Characters!");
            });
    }, [id]);

    if (!character) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>This is a page about a R&M character!</h1>
            <div className="w-72 h-auto">
                <img src={character.image} alt={character.name} />
            </div>
            <p><strong>Name:</strong> {character.name}</p>
            <p><strong>Species:</strong> {character.species}</p>
            <p><strong>Status:</strong> {character.status}</p>
            <button onClick={() => toggleFav(character.id)}>
                {favs.includes(character.id) ? "Remove Fav" : "Add Fav"}
            </button>
            <br />
            <Link to="/">Return to List</Link>
        </div>
    )
}

export default Details;