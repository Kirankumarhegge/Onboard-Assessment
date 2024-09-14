import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const OnBoard = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const nickname = state?.nickname;

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [answers, setAnswers] = useState({});

    axios.defaults.withCredentials = true;
    useEffect(() => {
        if (!nickname) {
            navigate("/user/signup");
            return;
        }

        const fetchQuestions = async () => {
            try {
                const response = await axios.get("http://localhost:3001/assess", {
                    headers: { nickname }
                });

                setQuestions(response.data);

                const answeredQuestions = response.data.filter(
                    (question) => question.entryType === "ANSWERED"
                );
                const answeredMap = {};
                answeredQuestions.forEach((question) => {
                    answeredMap[question.QuesId] = question.ansValues;
                });
                setAnswers(answeredMap);
            } catch (error) {
                navigate('/error', { state: { errorMessage: "Token is Not correct" } });
            }
        };

        fetchQuestions();
    }, [nickname, navigate]);

    useEffect(() => {
        const currentQuestion = questions[currentQuestionIndex];

        if (currentQuestion && answers[currentQuestion.QuesId]) {
            setSelectedAnswers(answers[currentQuestion.QuesId]);
        } else {
            setSelectedAnswers([]);
        }
    }, [currentQuestionIndex, questions, answers]);

    const handleAnswerChange = (currentQuestion, selectedOption) => {
        setSelectedAnswers((prev) => {
            if (currentQuestion.optionType == "SINGLE_CHOICE") {
                return [selectedOption];
            } else if (currentQuestion.optionType == "MULTIPLE_CHOICE"){
                return [...prev, selectedOption];
            }
        });
    };

    const handleNext = async (currentQuestion) => {
        if (currentQuestionIndex >= questions.length - 1) {
            navigate("/completed");
            return;
        }

        try {
            let response = await axios.post("http://localhost:3001/assess/submit", {
                nickname,
                question: currentQuestion,
                answer: selectedAnswers,
            });
            setAnswers((prev) => ({ ...prev, [currentQuestion.QuesId]: selectedAnswers }));

            const assessQues = await axios.get("http://localhost:3001/assess", {
                headers: { nickname }
            });
            setQuestions(assessQues.data);

        } catch (error) {
            navigate('/error', { state: { errorMessage: "Token is Not correct" } });
        }

        let nextIndex = currentQuestionIndex + 1;
        if (currentQuestion.hasChildQuestion) {
            const hasChildCondition = selectedAnswers.some((ans) => ans.optionId === currentQuestion.childCondition);
            nextIndex = hasChildCondition ? currentQuestionIndex + 1 : currentQuestionIndex + 2;
        }
        setCurrentQuestionIndex(nextIndex);
    };

    const handlePrev = async () => {
        if (currentQuestionIndex > 0) {
            const prevIndex = currentQuestionIndex - 1;
            const prevQuestion = questions[prevIndex];

            if (prevQuestion.isChildQuestion === true) {
                const prevPrevQuestion = questions[prevIndex - 1];
                if (prevPrevQuestion && prevPrevQuestion.ansValues[0].optionId === prevPrevQuestion.childCondition) {
                    setCurrentQuestionIndex(prevIndex);
                } else {
                    setCurrentQuestionIndex(prevIndex - 1);
                }
            } else if (prevQuestion && prevQuestion.isChildQuestion === false) {

                setCurrentQuestionIndex(prevIndex);
            }
        }
    };


    if (questions.length === 0) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const isAnswerGiven = answers[currentQuestion?.QuesId] !== undefined;

    return (
        <div className="flex flex-col min-h-screen p-4">
            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold">Welcome, {nickname}!</h1>
            </div>
            {currentQuestion && (
                <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">{currentQuestion.question}</h2>
                        <div className="space-y-2">
                            {currentQuestion.options.map((option) => (
                                <div key={option.optionId} className="flex items-center space-x-2">
                                    <input
                                        type={currentQuestion.optionType === "MULTIPLE_CHOICE" ? "checkbox" : "radio"}
                                        name="option"
                                        id={option.optionId}
                                        value={option.optionValue}
                                        checked={selectedAnswers.some((ans) => ans.optionId === option.optionId)}
                                        onChange={() => handleAnswerChange(currentQuestion, option)}
                                        className={`form-${currentQuestion.entryType === "MULTIPLE_CHOICE" ? "checkbox" : "radio"} h-4 w-4 text-indigo-600`}
                                    />
                                    <label htmlFor={option.optionId} className="text-gray-700">
                                        {option.optionValue}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={handlePrev}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => handleNext(currentQuestion)}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
                                disabled={selectedAnswers.length === 0}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OnBoard;
