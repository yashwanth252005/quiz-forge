import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-0" style={{ position: 'relative', bottom: '0px', marginBottom: '100px', width: '100%' }}>
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Quiz Forge. All Rights Reserved.</p>
                <p>Created by <a href="https://www.linkedin.com/in/your-linkedin-profile" target="_blank" rel="noopener noreferrer" className="text-blue-400">Your Name</a></p>
            </div>
        </footer>
    );
};

export default Footer;
