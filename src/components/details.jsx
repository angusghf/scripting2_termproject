// UseState lets us create and manage data
// useEffect helps run code when a component loads
import { useState, useEffect } from "react";
// this part helps us dynamically update the page
import { useParams, Link } from "react-router-dom";

// importing our navbar and footer component from their respective folder
import Navbar from "./navbar";
import Footer from "./footer";

function Details() {
    // get the id parameter from URL
    const { id } = useParams();
    // create a new state called character and setCharacter to start storing details
    // initially set to null
    const [character, setCharacter] = useState(null);
    // create a new state called favs and setFavs to store details
    const [favs, setFavs] = useState(() => {
        // create a new function called savedFavs
        // checks to see if there are any existing favorites in the local storage
        // local storage persists information even after closing/refreshing the site
        const savedFavs = localStorage.getItem("favs");
        // if favorites exist, put them into an array
        return savedFavs ? JSON.parse(savedFavs) : [];
    });

    // Toggle favorite function (heps us add and remove favs)
    const toggleFav = (characterID) => {
        let filteredFavs;
        // checks if the character ID is already in favs
        if (favs.includes(characterID)) {
            // if it is, remove it by filtering it out
            filteredFavs = favs.filter((favId) => favId !== characterID);
        } else {
            // otherwise, add it to the favs list
            filteredFavs = [...favs, characterID];
        }
        // save the updated list to our local storage
        // local storage persists information even after closing/refreshing the site
        localStorage.setItem("favs", JSON.stringify(filteredFavs));
        // updating the state so that the new changes are reflected on the list of favorited characters
        setFavs(filteredFavs);
    };


    useEffect(() => {
        // fetching our information from the api!
        // also fetches the id from the url
        fetch(`https://rickandmortyapi.com/api/character/${id}`)
            // reading through the json response
            .then(response => response.json())
            // we then store the data in the character state
            .then(data => setCharacter(data))
            .catch((error) => {
                // and if there is an error, we can log it into the console to see if there are any issues from fetching the errors
                console.log("Error Fetching Characters!");
            });
    }, []);

    // making it so that if the character still hasn't loaded, it'll display a text 
    if (!character) {
        // the text is returned onto the page and is given styling
        return <div className="text-center align-center justify-center text-5xl text-red-500">Loading!</div>
    }


    return (
        <div>
            {/* importing our navbar to be used on this page */}
            <Navbar />
            {/* Here we create an overlapping div to give the elements inside some styling */}
            {/* things like centering the text and justifying the items to the center */}
            <div className="text-center align-center items-center justify-center">
                {/* same thing here, but this is specific to the container for h1 */}
                <div className="text-center align-center justify-center pb-10">
                    {/* and some more specific styling elements to h1 in specific */}
                    <h1 className="font-bold text-4xl pb-7">
                        Character Information</h1>
                </div>
                {/* same here */}
                <div className="flex justify-center items-center">
                    {/* and also giving these a bordered background so it looks tidier on the page */}
                    <div className="w-72 h-auto bg-slate-400 border p-5 rounded">
                        {/* grabbing the character's image from the api */}
                        {/* while also giving it an api based on the character's name, from the api as well */}
                        <img src={character.image} alt={character.name} className="mx-auto" />
                    </div>
                </div>
                {/* Here we have our paragraph tags with "XYZ:" which allows us to generate the words on the screen */}
                {/* On the other side of the strong tag, we have the "XYZ".name/species/status which grabs the information of from the API */}
                {/* So for instance, character.name grabs their name, characer.species grabs the character's species, etc. */}
                <p><strong>Name:</strong> {character.name}</p>
                {/* strong is for styling */}
                <p><strong>Species:</strong> {character.species}</p>
                <p><strong>Status:</strong> {character.status}</p>
                {/* and like our main page, we also have a button here to add or remove from our favs if we so choose */}
                <button className="bg-pink-600 rounded p-2 text-white mb-3" onClick={() => toggleFav(character.id)}>
                    {favs.includes(character.id) ? "Remove Fav" : "Add Fav"}
                </button>
                <br />
                <Link to="/" className="bg-blue-600 rounded p-2 text-white">Return to List</Link>
                {/* same thing here where we import our footer to be used on this page */}
                <Footer />
            </div>
        </div>
    )
}

export default Details;