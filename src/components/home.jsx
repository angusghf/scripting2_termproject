import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Home() {

    const [characters, setCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [favs, setFavs] = useState(() => {
        const savedFavs = localStorage.getItem("favs");
        return savedFavs ? JSON.parse(savedFavs) : [];
    });

    // Function to search characters
    const searchCharacters = () => {
        fetch("https://rickandmortyapi.com/api/character")
            .then((response) => response.json())
            .then((data) => {
                const filteredCharacters = data.results.filter((character) =>
                    character.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setCharacters(filteredCharacters);
            })
    };

    // Toggle favorite function
    const toggleFav = (characterID) => {
        let filteredFavs;
        if (favs.includes(characterID)) {
            // Loops through the favs array above
            // checks if the current item being looped through DOES NOT equal the character to remove
            // If they don't match, the comparison returns true, and the item is kept int he array
            // If they do match, the comparison returns false, and the item is "filtered out" of the array
            filteredFavs = favs.filter((favId) => favId !== characterID);
        } else {
            filteredFavs = [...favs, characterID];
        }

        localStorage.setItem("favs", JSON.stringify(filteredFavs));
        setFavs(filteredFavs);
    };



    // Fetch characters when the component mounts
    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/character")
            .then((response) => response.json())
            .then((data) => {
                 // Array of characters
                setCharacters(data.results);
            })
            .catch((error) => {
                console.log("Error Fetching Characters!");
            });
    }, []);

    return (
        <div>
            <h1>Rick and Morty Characters</h1>
            <input
                type="text"
                placeholder="Search for a character"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button onClick={searchCharacters}>Search</button>
            <ul>
                {characters.map((character) => (
                    <li key={character.id}>
                        <Link to={`/character/${character.id}`}>{character.name}</Link>
                        <button onClick={() => toggleFav(character.id)}>
                            {favs.includes(character.id) ? "Remove Fav" : "Add Fav"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
