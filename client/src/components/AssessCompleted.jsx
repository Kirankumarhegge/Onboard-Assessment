import React from 'react';

const AssessCompleted = () => {
    const handleGoHome = () => {
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-gray-300 flex flex-col items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
                <div className="text-center">
                    <img className="w-16 h-16 mx-auto mb-4 text-green-500" src="https://cdni.iconscout.com/illustration/premium/thumb/happy-chat-bot-illustration-download-in-svg-png-gif-file-formats--artificial-intelligence-robot-pack-science-technology-illustrations-7207939.png"></img>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Assessment Completed</h1>
                    <p className="text-gray-600 mb-6">Thank you for completing the assessment. We will Analyse the assessment and let you know.</p>
                    <button 
                        onClick={handleGoHome} 
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssessCompleted;
