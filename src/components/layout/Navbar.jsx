import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { useSelector } from "react-redux";

const Navbar = () => {
    const { user, loading } = useSelector((state) => state.auth);
    console.log("User :", user);
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
