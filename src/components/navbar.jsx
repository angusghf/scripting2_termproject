import React from "react";
// destructuring link component
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-slate-600 px-4 py-2 mb-12">
            <h1 className="my-5 mb-12 text-white text-6xl font-black mt-100 text-center">Rick & Morty Character List</h1>
            {/* horizontal divider for our content  */}
            <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-green-300"></hr>
            {/* creating our unoredered list of items */}
            <ul className="list-none flex m-0 p-0  pb-8 justify-evenly">
                <Link to="/">
                    <a href="#home" className="text-white text-2xl no-underline hover:text-sky-300 rounded-lg">Nav 1</a>
                </Link>
                <Link to="/favorites">
                    <a href="#about" className="text-white text-2xl no-underline hover:text-sky-300 rounded-lg">Nav 2</a>
                </Link>
                <a href="#about" className="text-white text-2xl no-underline hover:text-sky-300 rounded-lg">Nav 3</a>
            </ul>
        </nav>
    );
};

// Exporting this as 'Navbar'
export default Navbar;