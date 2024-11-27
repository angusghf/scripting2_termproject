import { useState,useEffect } from "react";
import { Link } from "react-router-dom"


function Favorites() {

    const [saveddogs, setSaveddogs] = useState(() => {

        const savedFavs = localStorage.getItem("favs");
        return savedFavs ? JSON.parse(savedFavs) : [];

    });

    useEffect( () => {

        fetch("https://mhw-db.com/armor")
            .then(response => response.json())
            .then(dogs => {
                const favdogs = dogs.filter(alldog => {
                    return saveddogs.includes(alldog.id);
                })

                setSaveddogs(favdogs);

            });
    }, []);

    return(
        <>
            <h1>These are my favorites!</h1>
            <ul>
                {saveddogs.map( (dog) => (
                    <li key={dog.id}>
                        <Link to={`/dog${dog.id}`}>{dog.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Favorites;