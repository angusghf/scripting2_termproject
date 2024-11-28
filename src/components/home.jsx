import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../index.css';

import Navbar from "./navbar";
import Footer from "./footer";

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
            <Navbar />
            <div className="text-center align-center justify-center pb-12">
                <h1 className="font-bold text-4xl pb-7">
                    Search character
                </h1>
                <input
                    type="text"
                    className="bg-blue-200 px-2"
                    placeholder="Search for a character"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <button className="bg-slate-300 px-2 rounded border border-black " onClick={searchCharacters}>Search</button>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
                {characters.map((character) => (
                    <li key={character.id}>
                        <div className="bg-slate-100 shadow-md rounded-lg overflow-hidden p-4 flex flex-col items-center gap-y-2">
                            <img
                                src={character.image}
                                alt={character.name}
                                className="w-32 h-32 object-cover rounded-full mb-4"
                            />
                            <Link to={`/character/${character.id}`} className="hover:text-green-500">{character.name}</Link>
                            <button className="bg-pink-600 rounded p-2 text-white" onClick={() => toggleFav(character.id)}>
                                {favs.includes(character.id) ? "Remove Fav" : "Add Fav"}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <Footer />
        </div>
    );
}

export default Home;
