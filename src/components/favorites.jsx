import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Favourites() {
  // Load saved favorites from localStorage
  const [savedCharacters, setSavedCharacters] = useState(() => {
    const savedFavs = localStorage.getItem("favs");
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  // Fetch films data and filter based on saved characters
  useEffect(() => {
    fetch("https://ghibliapi.vercel.app/films")
      .then((response) => response.json())
      .then((characters) => {
        // Filter characters based on saved favorites
        const favCharacters = characters.filter((allCharacter) => {
          return savedCharacters.includes(allCharacter.id);
        });

        // Set the filtered characters
        setSavedCharacters(favCharacters);
      })
      .catch((error) => {
        console.log("Error fetching films:", error);
      });
  }, [savedCharacters]); // Adding savedCharacters as a dependency to refetch data when the favorites change

  return (
    <>
      <h1>These are my favorite films!</h1>
      <ul>
        {savedCharacters.map((character) => (
          <li key={character.id}> {/* Use `id` as key */}
            <Link to={`/film/${character.id}`}>{character.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Favourites;
