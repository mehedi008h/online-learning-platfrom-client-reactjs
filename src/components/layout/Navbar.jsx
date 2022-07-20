import React from "react";
import { Link } from "react-router-dom";
import {
    AiOutlineCoffee,
    AiOutlineLogin,
    AiOutlineLogout,
    AiOutlineUserAdd,
} from "react-icons/ai";
import { FaUserAstronaut } from "react-icons/fa";
import { CgProfile, CgUserlane } from "react-icons/cg";
import { MdOutlineDashboard, MdOutlineMonetizationOn } from "react-icons/md";
import { BiListPlus } from "react-icons/bi";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { motion } from "framer-motion";
import logo from "../../assets/diploma.png";
import { logout } from "../../actions/authActions";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [instructorOpen, setInstructorOpen] = useState(false);

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        setOpen(false);
        setToggle(false);
    };
    return (
        <div className="flex">
            <div
                className="w-full nav fixed z-20"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #495C83 , #7A86B6)",
                }}
            >
                <div className="w-4/5 h-16 mx-auto flex justify-between items-center">
                    {/* logo section  */}
                    <div className="flex flex-row items-center gap-4">
                        <img
                            src={logo}
                            alt="Online Learning Platfrom"
                            className="w-10"
                        />
                        <Link
                            to={"/"}
                            className="text-white font-lato italic text-xl font-semibold tracking-wider lg:block md:block hidden"
                        >
                            Online Learning Platfrom
                        </Link>
                    </div>
                    {/* user section  */}
                    <div className="flex flex-row gap-4">
                        {user ? (
                            <>
                                {/* Instructor section  */}
                                {user.role &&
                                user.role.includes("Instructor") ? (
                                    <div className="lg:block md:block hidden">
                                        <div
                                            onClick={() =>
                                                setInstructorOpen(
                                                    instructorOpen
                                                        ? false
                                                        : true
                                                )
                                            }
                                            className="flex items-center gap-2  py-1 px-4 rounded-full text-white cursor-pointer relative hover:text-gray-200"
                                        >
                                            <FaUserAstronaut size={19} />
                                            Instructor
                                        </div>
                                        {instructorOpen && (
                                            <>
                                                <div className="flex flex-col bg-black py-4 rounded-md absolute top-16">
                                                    <Link
                                                        onClick={() =>
                                                            setInstructorOpen(
                                                                false
                                                            )
                                                        }
                                                        to="/instructor"
                                                        className="flex items-center gap-2 px-6 py-2 hover:bg-gray-500 bg-opacity-50   text-white"
                                                    >
                                                        <MdOutlineDashboard
                                                            size={19}
                                                        />
                                                        Dashboard
                                                    </Link>
                                                    <Link
                                                        onClick={() =>
                                                            setInstructorOpen(
                                                                false
                                                            )
                                                        }
                                                        to="/instructor/course/new"
                                                        className="flex items-center gap-2 px-6 py-2 hover:bg-gray-500 bg-opacity-50   text-white"
                                                    >
                                                        <BiListPlus size={19} />
                                                        Create Course
                                                    </Link>
                                                    <Link
                                                        onClick={() =>
                                                            setInstructorOpen(
                                                                false
                                                            )
                                                        }
                                                        to="/instructor/revenue"
                                                        className="flex items-center gap-2 px-6 py-2 hover:bg-gray-500 bg-opacity-50   text-white"
                                                    >
                                                        <MdOutlineMonetizationOn
                                                            size={19}
                                                        />
                                                        Revenue
                                                    </Link>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <div className="lg:block md:block hidden">
                                        <Link
                                            to="/user/become-instructor"
                                            className="flex items-center gap-1 px-6 py-2    text-white"
                                        >
                                            <CgUserlane size={19} />
                                            Become Instructor
                                        </Link>
                                    </div>
                                )}
                                <div className="lg:block md:block hidden">
                                    <div
                                        className="border py-1 px-4 rounded-full text-white cursor-pointer relative hover:border-gray-200 hover:text-gray-200"
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
                                                    onClick={() =>
                                                        setOpen(false)
                                                    }
                                                    to="/user"
                                                    className="flex items-center gap-2 px-6 py-2 hover:bg-gray-500 bg-opacity-50   text-white"
                                                >
                                                    <MdOutlineDashboard
                                                        size={19}
                                                    />
                                                    Dashboard
                                                </Link>
                                                <Link
                                                    onClick={() =>
                                                        setOpen(false)
                                                    }
                                                    to="/user/profile"
                                                    className="flex items-center gap-2 px-6 py-2 hover:bg-gray-500 bg-opacity-50   text-white"
                                                >
                                                    <CgProfile size={19} />
                                                    My profile
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center gap-2 px-6 py-2 hover:bg-red-500 bg-opacity-50   text-white"
                                                >
                                                    <AiOutlineLogout
                                                        size={19}
                                                    />
                                                    Logout
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="lg:flex md:flex gap-4 hidden">
                                <Link
                                    to={"/login"}
                                    className="flex items-center gap-1 text-white hover:text-gray-100"
                                >
                                    <AiOutlineLogin size={19} />
                                    Login
                                </Link>
                                <Link
                                    to={"/signup"}
                                    className="flex items-center gap-1 text-white hover:text-gray-100"
                                >
                                    <AiOutlineUserAdd size={19} />
                                    Sign Up
                                </Link>
                            </div>
                        )}

                        <div className="lg:hidden md:hidden flex text-white">
                            <HiMenuAlt3
                                onClick={() => setToggle(true)}
                                size={19}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* small device section  */}
            {toggle && (
                <motion.div
                    whileInView={{ x: [300, 0] }}
                    transition={{ duration: 0.85, ease: "easeOut" }}
                    className="bg-black h-screen w-full fixed z-30 lg:hidden md:hidden block"
                >
                    <HiX
                        size={25}
                        className="text-red-500 bg-white h-10 w-10 rounded-full p-2 absolute top-10 right-10 hover:bg-gray-100"
                        onClick={() => setToggle(false)}
                    />
                    <ul className="text-white h-screen flex flex-col justify-center items-center gap-4 text-xl font-roboto tracking-wider">
                        <li className="">
                            <Link to="/" onClick={() => setToggle(false)}>
                                Home
                            </Link>
                        </li>
                        {user ? (
                            <>
                                <li className="text-blue-500 text-2xl -tracking-tighter font-lobster py-1 border-2 w-full text-center border-dotted">
                                    User
                                </li>

                                <li>
                                    <Link
                                        onClick={() => setToggle(false)}
                                        to="/user"
                                        className="flex items-center gap-2 hover:bg-gray-500 bg-opacity-50   text-white"
                                    >
                                        <MdOutlineDashboard size={19} />
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => setToggle(false)}
                                        to="/user/profile"
                                        className="flex items-center gap-2 hover:bg-gray-500 bg-opacity-50   text-white"
                                    >
                                        <CgProfile size={19} />
                                        My profile
                                    </Link>
                                </li>

                                {user?.role &&
                                user.role.includes("Instructor") ? (
                                    <>
                                        <li className="text-blue-500 text-2xl -tracking-tighter font-lobster py-1 border-2 w-full text-center border-dotted">
                                            Instructor
                                        </li>
                                        <li>
                                            <Link
                                                onClick={() => setToggle(false)}
                                                to="/instructor"
                                                className="flex items-center gap-2  hover:bg-gray-500 bg-opacity-50   text-white"
                                            >
                                                <MdOutlineDashboard size={19} />
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                onClick={() => setToggle(false)}
                                                to="/instructor/course/new"
                                                className="flex items-center gap-2  hover:bg-gray-500 bg-opacity-50   text-white"
                                            >
                                                <BiListPlus size={19} />
                                                Create Course
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                onClick={() => setToggle(false)}
                                                to="/instructor/revenue"
                                                className="flex items-center gap-2  hover:bg-gray-500 bg-opacity-50   text-white"
                                            >
                                                <MdOutlineMonetizationOn
                                                    size={19}
                                                />
                                                Revenue
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/user/become-instructor"
                                            onClick={() => setToggle(false)}
                                            className="flex items-center gap-2 text-white"
                                        >
                                            <CgUserlane size={19} />
                                            Become Instructor
                                        </Link>
                                    </>
                                )}
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2  hover:bg-red-500 bg-opacity-50   text-white"
                                    >
                                        <AiOutlineLogout size={19} />
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to={"/login"}
                                        onClick={() => setToggle(false)}
                                        className="flex items-center gap-1 text-white hover:text-gray-100"
                                    >
                                        <AiOutlineLogin size={19} />
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={"/signup"}
                                        onClick={() => setToggle(false)}
                                        className="flex items-center gap-1 text-white hover:text-gray-100"
                                    >
                                        <AiOutlineUserAdd size={19} />
                                        Sign Up
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </motion.div>
            )}
        </div>
    );
};

export default Navbar;
