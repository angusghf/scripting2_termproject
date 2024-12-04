// importing react library for us to use
import React from "react";
// adding linking functionality
import { Link } from "react-router-dom";

// Calling it an appropriate title, such as Footer
const Footer = () => {
    return (
        // giving it an overarching style
        <div className="bg-slate-600 px-4 py-2 mt-12">
            {/* giving it tailwind styling */}
            {/* giving it responsiveness via "sm:" */}
            {/* also using our custom color 'raisin' established in tailwind config */}
            <div className="bg-raisin py-12 px-6 sm:py-16 sm:px-10">
                <div className="text-center">
                    {/* tailwind styling here */}
                    <h1 className="pb-12 text-white text-4xl">Rick and Morty API</h1>
                    <hr />
                    {/* some infomration for the footer */}
                    <h3 className="py-12 text-white text-xl">Rick and Morty is an American adult animated science fiction sitcom created by Justin Roiland and Dan Harmon for Cartoon Network's nighttime programming block Adult Swim. </h3>
                    {/* horizontal dividers to give it some spacing */}
                    <hr className="pb-12"></hr>
                    {/* some overarching styling for our list of links */}
                    <ul className="list-none flex m-0 p-0  pb-8 justify-evenly">
                        {/* link back to the homepage */}
                        <Link to="/">
                            {/* adding some styles and text to it */}
                            <a href="#home" className="text-green-300 text-2xl no-underline hover:text-sky-300 rounded-lg">Character List</a>
                        </Link>
                        {/* same here but for favorites */}
                        <Link to="/favorites">
                            {/* adding text and styling as well */}
                            <a href="#about" className="text-green-300 text-2xl no-underline hover:text-sky-300 rounded-lg">Favorites</a>
                        </Link>
                    </ul>
                </div>
            </div >
        </div >
    );
};

// exporting the footer to be used across the site
export default Footer;
