import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1 className="underline mt-20">
                <Link to={"/home"}>Home</Link>
            </h1>
        </div>
    );
};

export default Home;
