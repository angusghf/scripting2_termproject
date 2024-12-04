// adding useState and useEffect which helps us manage and manipulate the page's data and components
import { useState, useEffect } from "react";
// adding link for us to link back to this page
import { Link } from "react-router-dom";
// import our css document
import '../index.css';

// as well as our navbar and footer to be used on this page
import Navbar from "./navbar";
import Footer from "./footer";

function Home() {
    // state to store the characters we fetch from our API
    const [characters, setCharacters] = useState([]);
    // state to keep track of what the user searches
    const [searchTerm, setSearchTerm] = useState("");
    // state to store our favorited characters
    const [favs, setFavs] = useState(() => {
        // uses local storage to see if there are any past favs
        const savedFavs = localStorage.getItem("favs");
        // if there are, then return them, otherwise start with an empty array of favs
        return savedFavs ? JSON.parse(savedFavs) : [];
    });

    // Function to search characters
    const searchCharacters = () => {
        // fetching the API from the link
        fetch("https://rickandmortyapi.com/api/character")
            // response from our api is fetched and processed into json, which is now usable is json
            .then((response) => response.json())
            .then((data) => {
                // function where the results of the id grabbed is the same as the character
                const filteredCharacters = data.results.filter((character) =>
                    // this section is used to convert what we typed into lower case so that the names are consistent and aren't case sensistive
                    character.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                // updating state with filtered list
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
            // if not a fav, then add to fav
            filteredFavs = [...favs, characterID];
        }

        // update local storage with the new favs list
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
            // having a catch block so that if there is an error
            .catch((error) => {
                // if there is an error, the console logs it and displays the message
                console.log("Error Fetching Characters!");
            });
    }, []);

    return (
        <div>
            {/* returning the navbar to the page */}
            <Navbar />
            {/* giving the search bar a style */}
            <div className="text-center align-center justify-center pb-12">
                {/* give the h1 some styling */}
                <h1 className="font-bold text-4xl pb-7">
                    Search character
                </h1>
                {/* puttin an input field */}
                <input
                    type="text"
                    // with some styling
                    className="bg-blue-200 px-2"
                    // and placeholder text
                    placeholder="Search for a character"
                    value={searchTerm}
                    // updates searchTerm state whenever the user types in the input field
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                {/* button to trigger the search */}
                {/* has styling to it  */}
                <button className="bg-slate-300 px-2 rounded border border-black " onClick={searchCharacters}>Search</button>
            </div>
            {/* styling the list of items and making it responsive */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
                {characters.map((character) => (
                    <li key={character.id}>
                        <div className="bg-slate-100 shadow-md rounded-lg overflow-hidden p-4 flex flex-col items-center gap-y-2">
                            <img
                                // grabbing the image from the api
                                src={character.image}
                                // as well as the name to display it as the alt tag
                                alt={character.name}
                                // and giving it styling too
                                className="w-32 h-32 object-cover rounded-full mb-4"
                            />
                            {/* creating a link so that we can click into the character's name to view the details */}
                            <Link to={`/character/${character.id}`} className="hover:text-green-500">{character.name}</Link>
                            {/* also adding a button that allows us to add/remove from favs */}
                            {/* has styling as well */}
                            <button className="bg-pink-600 rounded p-2 text-white" onClick={() => toggleFav(character.id)}>
                                {favs.includes(character.id) ? "Remove Fav" : "Add Fav"}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {/* returning the footer as well */}
            <Footer />
        </div>
    );
}

export default Home;
