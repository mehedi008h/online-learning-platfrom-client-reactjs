import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, login } from "../../actions/authActions";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, error } = useSelector((state) => state.auth);

    useEffect(() => {
        // if (isAuthenticated) {
        //     navigate("/");
        // }

        if (error) {
            error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, isAuthenticated, error, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <div
            className="w-full flex justify-center items-center"
            style={{ minHeight: "calc(100vh - 4rem)" }}
        >
            <div className="p-4 bg-black rounded-md shadow text-white w-1/4">
                <h1 className="text-center">Login</h1>
                <form onSubmit={submitHandler} className="mt-6 mb-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full py-1 px-4 rounded-full outline-none text-black"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full py-1 px-4 mt-6 rounded-full outline-none text-black"
                    />
                    <button
                        type="submit"
                        className="py-1 px-6 rounded-full bg-blue-500 text-white text-center mt-4"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
