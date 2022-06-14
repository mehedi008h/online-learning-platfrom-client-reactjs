import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, register } from "../../actions/authActions";

const Signup = () => {
    const [name, setName] = useState("");
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
    const formData = {
        name: name,
        email: email,
        password: password,
    };

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(register(formData));
    };
    return (
        <div
            className="w-full flex justify-center items-center"
            style={{ minHeight: "calc(100vh - 4rem)" }}
        >
            <div className="p-4 bg-black rounded-md shadow text-white w-1/4">
                <h1 className="text-center">Signup</h1>
                <form onSubmit={submitHandler} className="mt-6 mb-4">
                    <input
                        type="text"
                        value={name}
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        className="w-full py-1 px-4 rounded-full outline-none text-black"
                    />
                    <input
                        type="email"
                        value={email}
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full py-1 px-4 mt-6 rounded-full outline-none text-black"
                    />
                    <input
                        type="password"
                        value={password}
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full py-1 px-4 mt-6 rounded-full outline-none text-black"
                    />
                    <button
                        type="submit"
                        className="py-1 px-6 rounded-full bg-blue-500 text-white text-center mt-4"
                    >
                        Signup
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
