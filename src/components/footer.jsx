import React from "react";

// Calling it an appropriate title, such as Footer
const Footer = () => {
    return (
        <div className="bg-slate-600 px-4 py-2 mt-12">
            {/* giving it tailwind styling */}
            {/* giving it responsiveness via "sm:" */}
            {/* also using our custom color 'raisin' established in tailwind config */}
            <div className="bg-raisin py-12 px-6 sm:py-16 sm:px-10">
                <div className="text-center">
                    {/* tailwind styling here */}
                    <h2 className="text-white text-xl sm:text-2xl font-bold">
                        {/* emojis are placed at the end */}
                        Footer
                    </h2>
                </div>
            </div >
        </div >
    );
};

// exporting the footer to be used across the site
export default Footer;
