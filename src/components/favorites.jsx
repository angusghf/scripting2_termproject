// UseState lets us create and manage data
// useEffect helps run code when a component loads
import { useState, useEffect } from "react";
// this part helps us dynamically update the page
import { Link } from "react-router-dom";

// importing our navbar and footer component from their respective folder
import Navbar from "./navbar";
import Footer from "./footer";


function Favorites() {
    // state to store fav character details
    const [savedCharacters, setSavedCharacters] = useState(() => {
        // checking local storage for existing favs
        const savedFavs = localStorage.getItem("favs");
        // returning the saved favorites
        // otherwise start with an empty array (no favs)
        return savedFavs ? JSON.parse(savedFavs) : [];

    });
    // new state to track favorited character ids
    const [favs, setFavs] = useState(() => {
        // essentailly the same thing where it checks local storage for existing favs
        const savedFavs = localStorage.getItem("favs");
        // returning the saved favs otherwise start empty
        return savedFavs ? JSON.parse(savedFavs) : [];
    });

    // function to add/remove favs
    const toggleFav = (characterID) => {
        let filteredFavs;
        if (favs.includes(characterID)) {
            // Loops through the favs array above
            // checks if the current item being looped through DOES NOT equal the character to remove
            // If they don't match, the comparison returns true, and the item is kept int he array
            // If they do match, the comparison returns false, and the item is "filtered out" of the array
            filteredFavs = favs.filter((favId) => favId !== characterID);
        } else {
            // if not a fav, then add to fav
            filteredFavs = [...favs, characterID];
        }

        // update local storage with the new favs list
        localStorage.setItem("favs", JSON.stringify(filteredFavs));
        setFavs(filteredFavs);
    };

            // fetching our information from the api!
    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/character")
        // convert the response to json
            .then(response => response.json())
            .then(data => {
                // filter character based on saved ids
                const favCharacters = data.results.filter(character => {
                    return savedCharacters.includes(character.id);
                });
                setSavedCharacters(favCharacters);
            });
    }, []);

    return (
        <div>
            {/* Returning the imported navbar here so we can use it on this page */}
            <Navbar />
            {/* creating a overarching div for styling for h1 */}
            <div className="text-center align-center justify-center pb-12">
                {/* giving the h1 more specific stylings */}
                <h1 className="font-bold text-4xl pb-7">
                    These are my favorites!</h1>
            </div>
            {/* creating a stylized list that uses grids and is responsive */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
                {savedCharacters.map((character) => (
                    <li key={character.id} className="bg-slate-100 shadow-md rounded-lg overflow-hidden p-4 flex flex-col items-center text-center gap-y-3">
                        <div>
                            {/* grabbing the image from the api */}
                            <img
                                src={character.image}
                                // and also giving it an alt tag
                                alt={character.name}
                                // as well as some styling
                                className="w-32 h-32 object-cover rounded-full mb-4"
                            />
                            {/* creating a link that can be access through the character's name */}
                            {/* also giving it some styling */}
                            <Link to={`/character/${character.id}`} className="hover:text-green-500">{character.name}</Link>
                        </div>
                        {/* adding a button that lets you add/remove from your favorites */}
                        {/* giving it some styling */}
                        <button className="bg-pink-600 rounded p-2 text-white" onClick={() => toggleFav(character.id)}>
                            {favs.includes(character.id) ? "Remove Fav" : "Add Fav"}
                        </button>
                    </li>
                ))}
            </ul>

            {/* also returning the footer to be displayed here */}
            <Footer />
        </div >
    );
}

export default Favorites;