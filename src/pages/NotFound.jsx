import React from "react";
import { Link } from "react-router-dom";
import notFround from "../assets/404.svg";
import MetaData from "../components/layout/MetaData";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-4">
            <MetaData title={"Page Not Found"} />
            <img className="w-80" src={notFround} alt="Page Not Found ..." />

            <Link
                to="/"
                className="py-2 px-6 rounded-full text-white"
                style={{
                    backgroundImage:
                        "linear-gradient(to left, #495C83 , #7A86B6)",
                }}
            >
                Go To Home
            </Link>
        </div>
    );
};

export default NotFound;
