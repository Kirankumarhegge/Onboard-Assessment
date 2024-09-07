import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';



const ErrorCard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { errorMessage } = location.state || { errorMessage: 'An unknown error occurred' };

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 p-6">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <img src='https://cdn.dribbble.com/users/19381/screenshots/3471308/media/73882883ebcb70a77e2a8a3f9e44f67a.gif' alt="Error" className="w-full h-48 object-cover" />
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4 text-center">Oops! Something went wrong</h1>
                    <p className="text-lg text-gray-700 mb-6 text-center">{errorMessage}</p>
                    <button
                        onClick={handleBackToHome}
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorCard;
