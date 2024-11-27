import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";


function Details() {

    const { id } = useParams();
    const [dog, setdog] = useState(null);

    useEffect(() => {

        // console.log("this is a dog page, the id in the URL is")
        fetch(`https://mhw-db.com/armor`)
            .then(response => response.json())
            .then(dataObj => setdog(dataObj));

    }, []);

    if (!dog) {
        return <div>Loading...</div>
    }

    return (
        <div>
        // <h1>This is a page about a dog!</h1>
            <h1>{dog.title}</h1>
            <p>{dog.description}</p>
            <p><strong>Director:</strong>{dog.director}</p>
            <p><strong>Producer:</strong>{dog.producer}</p>
            <p><strong>Rotten Tomatoes Score:</strong>{dog.rt_score}</p>
            <Link to="/">Return to List</Link>
        </div>
    )
}

export default Details;