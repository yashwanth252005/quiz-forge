import React, { useEffect, useState } from 'react';
import logo from '../assets/Logo.svg'; // Adjust the path to your logo

const MobileWarning = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            // Check if screen width is less than a certain size (e.g., 768px for tablets)
            if (window.innerWidth <= 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!isMobile) return null;  // Only show warning if on mobile/tablet

    return (<>
        <nav className="bg-gray-900 text-white p-4 fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto p-1 flex flex-wrap justify-between items-center">
                <div className="flex items-center space-x-3">
                    <img src={logo} alt="Logo" className="w-8 h-8 rounded-full" />
                    <h1 className="text-2lg font-bold">Quiz Forge</h1>
                </div>
                <div className="flex items-center space-x-4"></div>
                <a href="https://www.linkedin.com/in/your-linkedin-profile" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">LinkedIn</a>
                <a href="https://github.com/your-github-profile" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">GitHub</a>
            </div>
        </nav>
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4">
            {/* Warning message for mobile users */}
            <div className="bg-white text-center p-6 rounded-xl shadow-lg max-w-sm mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Please use a Laptop/Desktop</h2>
                <p className="text-gray-600">Our mobile/Tablet version is under development. Thank you for your patience!</p>
            </div>
        </div>
    </>
    );
};

export default MobileWarning;
