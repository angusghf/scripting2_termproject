import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Favorites() {
    const [savedCharacters, setSavedCharacters] = useState(() => {
        const savedFavs = localStorage.getItem("favs");
        return savedFavs ? JSON.parse(savedFavs) : [];
    });

    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/character")
            .then(response => response.json())
            .then(data => {
                const favCharacters = data.results.filter(character => {
                    return savedCharacters.includes(character.id);
                });
                setSavedCharacters(favCharacters);
            });
    }, []);

    return (
        <>
            <h1>These are my favorites!</h1>
            <ul>
                {savedCharacters.map((character) => (
                    <li key={character.id}>
                        <Link to={`/characters/${character.id}`}>{character.name}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Favorites;