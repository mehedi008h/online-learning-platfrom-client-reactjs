import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, login } from "../../actions/authActions";
import { toast } from "react-toastify";
import login_image from "../../assets/Lesson-amico.svg";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, isAuthenticated, error, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <div className="w-full bg-gray-200 flex justify-center items-center h-screen p-4">
            <div className="p-8 bg-white rounded-md shadow md:w-3/5 lg:w-3/5 w-full">
                <div className="grid md:grid-cols-12 lg:grid-cols-12 grid-cols-none gap-4 justify-center items-center">
                    <div className="col-span-6">
                        <div className="w-4/5 mx-auto">
                            <img src={login_image} alt="" />
                        </div>
                    </div>
                    <div className="col-span-6 px-4">
                        <h1 className="font-bold text-lg text-center">
                            Member Login
                        </h1>
                        <form onSubmit={submitHandler} className="mt-6 mb-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                className="w-full py-2 px-6 rounded-full outline-none  bg-gray-100 text-black"
                            />

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                className="w-full mt-6 py-2 px-6 rounded-full outline-none  bg-gray-100 text-black"
                            />

                            <button
                                type="submit"
                                className="py-2 px-6 w-full rounded-full bg-blue-500 text-white text-center mt-4 cursor-pointer"
                            >
                                Login
                            </button>
                        </form>
                        <div className="text-center">
                            <Link className="text-blue-500" to="/forgot">
                                Forgot Password
                            </Link>
                            <p className="mt-4">
                                Already have an account !{" "}
                                <Link className="text-blue-500" to="/signup">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
