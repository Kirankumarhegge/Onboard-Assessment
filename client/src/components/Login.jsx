import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [nicknameError, setNicknameError] = useState(false);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    //     if (!nickname) return;
    //     try {
    //         const response = await axios.post(
    //             "http://localhost:3001/user/check-nickname",
    //             { nickname }
    //         );
    //         if (response.data.exists) {
    //             setNicknameError(true);
    //             setError("Nickname already exist.");
    //         } else {
    //             setNicknameError(false);
    //             setError("");
    //         }
    //     } catch (err) {
    //         setNicknameError(true);
    //         setError("Error checking nickname.");
    //     }
    // };

    const handleLogIn = async (e) => {
        e.preventDefault();
        if (nickname == "") {
            setError("Nickname Required");
            return 
        }
        else if (password == "") {
            setError("Password Required");
            return
        }
        else{
            setError("");
        }
        try {
            const response = await axios.post("http://localhost:3001/user/login", {
                nickname,
                password
            });
            if (response.data.error) {
                setError(response.data.error);
                return
            }
            else {
                navigate("/assess/onboard", { state: { nickname: nickname } });
            }
        } catch (err) {
            setError(err.response.data.error || "Signup failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-300 flex flex-col items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-4">
                <div className="flex min-h-full flex-1 flex-col justify-center px-1 py-12 lg:px-1">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Log In your account
                        </h2>
                    </div>

                    <div className="flex justify-center mt-10 w-100">
                        <form className="space-y-6">
                            <div className="w-80">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Nickname
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="nickname"
                                        name="nickname"
                                        type="text"
                                        required
                                        autoComplete="off"
                                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6"
                                        value={nickname}
                                        onChange={(e) => setNickname(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            {error != "" && <p className="text-sm text-red-500">{error}</p>}

                            <div className="flex justify-center">
                                <button
                                    className="flex w-40 justify-center  rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={handleLogIn}
                                >
                                    Log In
                                </button>
                            </div>
                        </form>  
                    </div>
                    <p className="mt-4 text-sm text-center text-gray-600">Don't have an account? 
                        <a href="/user/signup" className="text-indigo-600 hover:underline">Sign Up</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
