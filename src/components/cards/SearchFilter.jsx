import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

const SearchFilter = ({ category, setCategory }) => {
    const [keyword, setKeyword] = useState("");

    const categories = [
        "Node JS",
        "React JS",
        "Spring Boot",
        "Java",
        "JavaScript",
        "Python",
        "Angular",
        "MongoDB",
        "Express JS",
        "Other",
    ];

    const navigate = useNavigate();

    const searchHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate("/");
        }
    };
    return (
        <div className="my-8 flex lg:flex-row md:flex-row flex-col flex-wrap justify-between items-center gap-4">
            <div className="h-12 px-4 rounded-md bg-white flex items-center gap-1 w-full md:w-fit lg:w-fit">
                <b className="text-gray-500">Category : </b>
                <select
                    name=""
                    id=""
                    className="outline-none bg-white px-4 text-pink-600 font-bold"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="" className="text-black">
                        All
                    </option>
                    {categories.map((category, index) => (
                        <option
                            key={index}
                            value={category}
                            className="text-black"
                        >
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div className="lg:w-1/3 md:w-1/3 w-full">
                <form onSubmit={searchHandler}>
                    <div className="flex items-center">
                        <input
                            type="text"
                            className="h-12 px-4 rounded-l-md outline-none w-full"
                            placeholder="Enter Course Name ..."
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <button className="h-12 px-2 bg-white rounded-r-md">
                            <AiOutlineSearch size={20} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SearchFilter;
