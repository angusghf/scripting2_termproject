import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import Navbar from "./navbar";
import Footer from "./footer";

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
        return <div className="text-center align-center justify-center text-5xl text-red-500">Loading!</div>
    }

    return (
        <div>
            <Navbar />
            <div className="text-center align-center items-center justify-center">
                <div className="text-center align-center justify-center pb-10">
                    <h1 className="font-bold text-4xl pb-7">
                        Character Information</h1>
                </div>
                <div className="flex justify-center items-center">
                <div className="w-72 h-auto bg-slate-400 border p-5 rounded">
                    <img src={character.image} alt={character.name} className="mx-auto" />
                </div>
                </div>
                <p><strong>Name:</strong> {character.name}</p>
                <p><strong>Species:</strong> {character.species}</p>
                <p><strong>Status:</strong> {character.status}</p>
                <button className="bg-pink-600 rounded p-2 text-white mb-3" onClick={() => toggleFav(character.id)}>
                    {favs.includes(character.id) ? "Remove Fav" : "Add Fav"}
                </button>
                <br />
                <Link to="/" className="bg-blue-600 rounded p-2 text-white">Return to List</Link>
                <Footer />
            </div>
        </div>
    )
}

export default Details;