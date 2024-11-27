import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Home() {

    const [dogs, setdogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [favs, setFavs] = useState(() =>{
        const savedFavs = localStorage.getItem("favs");
        return savedFavs ? JSON.parse(savedFavs) : [];
    })

    // New function to search dogs
    const searchdogs = () => {
        fetch("https://mhw-db.com/armor")
            .then(response => response.json())
            .then(dogsArray => {

                // const searchTerm = "Cat";

                const filtereddogs = dogsArray.filter((loopdog) => {

                    return loopdog.title.toLowerCase().includes(searchTerm.toLowerCase());

                });

                setdogs(filtereddogs);

            })
    }

    const toggleFav = (dogID) => {

        let filteredFavs;

        if(favs.includes(dogID)) {
            // Loops through the favs array above
            // checks if the current item being looped through DOES NOT equal the dog to remove
            // If they don't match, the comparison returns true, and the item is kept int he array
            // If they do match, the comparison returns false, and the item is "filtered out" of the array
            filteredFavs = favs.filter( favId => favId !== dogID );

        } else {

            filteredFavs = [...favs, dogID];

        }

        localStorage.setItem("favs", JSON.stringify(filteredFavs));

        // setFavs([...favs,dogID]);
        setFavs(filteredFavs);

    }


    useEffect(() => {

        fetch("https://mhw-db.com/armor")
            .then((response) => {
                return response.json();
            })
            .then((dataObj) => {
                setdogs(dataObj);
            })
            .catch((error) => {
                console.log("Error Fetching dogs!");
            });

    }, []);

    return (
        <>
            <h1>Dog Facts Search</h1>
            <input
                type="text"
                placeholder="search for your favorite"
                value={searchTerm}
                onChange={(event) => { setSearchTerm(event.target.value)}}
            />
            <button onClick={searchdogs}>Search</button>
            <ul>
                {dogs.map((dog) => (
                    <li key={dog.id}>
                        <Link to={`/dog/${dog.id}`}>{dog.title}</Link>
                        
                        <button onClick={ ()=> { toggleFav(dog.id) }}>
                            { favs.includes(dog.id) ? "Remove Fav" : "Add Fav" }
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Home;