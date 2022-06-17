import React from "react";
import { Link } from "react-router-dom";
import {
    AiOutlineCoffee,
    AiOutlineLogin,
    AiOutlineUserAdd,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logout } from "../../actions/authActions";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [instructorOpen, setInstructorOpen] = useState(false);

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    console.log("User :", user);

    const handleLogout = () => {
        dispatch(logout());
    };
    return (
        <div className="flex">
            <div
                className="w-full nav fixed z-20"
                style={{ background: "#3A3E59" }}
            >
                <div className="w-4/5 h-16 mx-auto flex justify-between items-center">
                    <div className="">
                        <Link to={"/"} className="text-white">
                            Home
                        </Link>
                    </div>
                    <div className="flex flex-row gap-4">
                        {user ? (
                            <>
                                {user.role && user.role.includes("Instructor") && (
                                    <div>
                                        <div
                                            onClick={() =>
                                                setInstructorOpen(
                                                    instructorOpen
                                                        ? false
                                                        : true
                                                )
                                            }
                                            className="flex items-center gap-2  py-1 px-4 rounded-full text-white cursor-pointer relative"
                                        >
                                            <AiOutlineLogin size={19} />
                                            Instructor
                                        </div>
                                        {instructorOpen && (
                                            <>
                                                <div className="flex flex-col bg-black py-4 rounded-md absolute top-16">
                                                    <Link
                                                        to="/instructor"
                                                        className="flex items-center gap-1 px-6 py-2 hover:bg-gray-500 bg-opacity-50   text-white"
                                                    >
                                                        <AiOutlineLogin
                                                            size={19}
                                                        />
                                                        Dashboard
                                                    </Link>
                                                    <Link
                                                        to="/instructor"
                                                        className="flex items-center gap-1 px-6 py-2 hover:bg-gray-500 bg-opacity-50   text-white"
                                                    >
                                                        <AiOutlineLogin
                                                            size={19}
                                                        />
                                                        Create Course
                                                    </Link>
                                                    <Link
                                                        to="/instructor"
                                                        className="flex items-center gap-1 px-6 py-2 hover:bg-gray-500 bg-opacity-50   text-white"
                                                    >
                                                        <AiOutlineLogin
                                                            size={19}
                                                        />
                                                        Revenue
                                                    </Link>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                                <div>
                                    <div
                                        className="border py-1 px-4 rounded-full text-white cursor-pointer relative"
                                        onClick={() =>
                                            setOpen(open ? false : true)
                                        }
                                    >
                                        <div className="flex items-center gap-2">
                                            <AiOutlineCoffee size={19} />
                                            <span>{user?.name}</span>
                                        </div>
                                    </div>

                                    {open && (
                                        <>
                                            <div className="flex flex-col bg-black py-4 rounded-md absolute top-16">
                                                <Link
                                                    to="/user"
                                                    className="flex items-center gap-1 px-6 py-2 hover:bg-gray-500 bg-opacity-50   text-white"
                                                >
                                                    <AiOutlineLogin size={19} />
                                                    Dashboard
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center gap-1 px-6 py-2 hover:bg-red-500 bg-opacity-50   text-white"
                                                >
                                                    <AiOutlineLogin size={19} />
                                                    Logout
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to={"/login"}
                                    className="flex items-center gap-1 text-white"
                                >
                                    <AiOutlineLogin size={19} />
                                    Login
                                </Link>
                                <Link
                                    to={"/signup"}
                                    className="flex items-center gap-1 text-white"
                                >
                                    <AiOutlineUserAdd size={19} />
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
