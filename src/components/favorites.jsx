import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Navbar from "./navbar";
import Footer from "./footer";


function Favorites() {
    const [savedCharacters, setSavedCharacters] = useState(() => {
        const savedFavs = localStorage.getItem("favs");
        return savedFavs ? JSON.parse(savedFavs) : [];

    });
    const [favs, setFavs] = useState(() => {
        const savedFavs = localStorage.getItem("favs");
        return savedFavs ? JSON.parse(savedFavs) : [];
    });

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
        <div>
            <Navbar />
            <div className="text-center align-center justify-center pb-12">
                <h1 className="font-bold text-4xl pb-7">
                    These are my favorites!</h1>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
                {savedCharacters.map((character) => (
                    <li key={character.id} className="bg-slate-100 shadow-md rounded-lg overflow-hidden p-4 flex flex-col items-center text-center gap-y-3">
                        <div>
                            <img
                                src={character.image}
                                alt={character.name}
                                className="w-32 h-32 object-cover rounded-full mb-4"
                            />
                            <Link to={`/character/${character.id}`} className="hover:text-green-500">{character.name}</Link>
                        </div>
                        <button className="bg-pink-600 rounded p-2 text-white" onClick={() => toggleFav(character.id)}>
                            {favs.includes(character.id) ? "Remove Fav" : "Add Fav"}
                        </button>
                    </li>
                ))}
            </ul>


            <Footer />
        </div >
    );
}

export default Favorites;