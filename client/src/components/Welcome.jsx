import React from 'react';

const Welcome = () => {
    const handleSignUp = () => {
        window.location.href = '/user/signup';
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
                <div className="text-center">
                <img className="w-16 h-16 mx-auto mb-4 text-green-500" src="https://cdni.iconscout.com/illustration/premium/thumb/happy-chat-bot-illustration-download-in-svg-png-gif-file-formats--artificial-intelligence-robot-pack-science-technology-illustrations-7207939.png"></img>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Hi, I'm AI</h1>
                    <p className="text-gray-600 mb-6">I'm here to analyze you through the assessment you're about to take. Let's get started!</p>
                    <button 
                        onClick={handleSignUp} 
                        className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        Start
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
