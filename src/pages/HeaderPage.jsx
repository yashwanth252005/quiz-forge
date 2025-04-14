import React from 'react';
import logo from '../assets/Logo.svg';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
    const navigate = useNavigate();

    const LinkedInURL = import.meta.env.VITE_LINKEDIN_URL;
    const GitHubURL = import.meta.env.VITE_GITHUB_URL;

    const handleProtectedNavigation = (path) => {
        const quizStarted = sessionStorage.getItem('quizStarted');
        if (quizStarted === 'true') {
            navigate(path);
        } else {
            toast.warning("⚠️ Fill the topic section and start the quiz to view this", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored"
            });
        }
    };

    return (
        <header className="bg-gray-800 text-white py-4" style={{ position: 'relative', top: 0, zIndex: 10 }}>
            <div className="container mx-auto flex justify-between items-center px-6 space-x-4 flex-wrap">
                {/* Logo & App Title */}
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
                    <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
                    <h1 className="text-2xl font-bold hover:text-blue-400">Quiz Forge</h1>
                </div>

                {/* Navigation Links */}
                <nav className="space-x-4 items-center hidden md:flex">
                    <div className="text-sm text-gray-400">© {new Date().getFullYear()} Quiz Forge</div>
                    <div onClick={() => navigate('/')} className="cursor-pointer hover:text-blue-400">Home</div>
                    <div onClick={() => handleProtectedNavigation('/quiz')} className="cursor-pointer hover:text-blue-400">Quiz</div>
                    <div onClick={() => handleProtectedNavigation('/result')} className="cursor-pointer hover:text-blue-400">Result</div>
                </nav>

                {/* Creator Info + Social Links */}
                <div className="flex flex-col md:flex-row md:items-center md:space-x-6 text-sm text-gray-400">
                    <div className="space-x-4 flex justify-between items-center px-6">
                        <div className='text-sm text-gray-400'>
                            Created by <a href="https://www.linkedin.com/in/your-linkedin-profile" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 hover:underline">@Yashwanth E S</a>
                        </div>
                        <div className="space-x-3">
                            <div className="text-sm text-white space-x-4 flex justify-between">Connect with us:</div>
                            <a href={LinkedInURL} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">LinkedIn</a>
                            <a href={GitHubURL} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
