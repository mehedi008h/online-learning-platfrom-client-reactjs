import React from "react";
import { BsCart4, BsPlayFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { MdPlayLesson } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CourseDetailsHeader = ({ course, setOpen, setPreview }) => {
    const { user } = useSelector((state) => state.auth);

    let edit = false;

    if (user && user?._id === course?.instructor?._id) {
        edit = true;
    }
    return (
        <div
            className="w-full flex"
            style={{ background: "#494d67", minHeight: "70vh" }}
        >
            <div className="w-4/5 mx-auto flex flex-col gap-4 items-center justify-center text-center">
                <h1 className="text-white font-semibold md:text-5xl sm:text-3xl text-3xl leading-relaxed tracking-wider">
                    {course?.name}
                </h1>
                <p className="text-gray-200 text-xl my-2 md:w-3/5 sm:w-full mx-auto leading-relaxed tracking-wider">
                    {course?.description}
                </p>
                <div className="my-4 flex md:flex-row flex-col gap-4">
                    {edit ? (
                        <>
                            <span className="border-2 border-white px-5 py-2 rounded-full text-white tracking-wider flex items-center justify-center gap-2 text-base hover:bg-white hover:text-black transition-all">
                                <MdPlayLesson size={25} />{" "}
                                {course?.lessons?.length} Lessones
                            </span>
                            <span className="border-2 border-white px-5 py-2 rounded-full text-white tracking-wider flex items-center justify-center gap-2 text-base hover:bg-white hover:text-black transition-all">
                                <MdPlayLesson size={25} />{" "}
                                {course?.lessons?.length} Lessones
                            </span>
                            <Link
                                to={`/instructor/course/update/${course?.slug}`}
                                className="px-5 py-3 rounded-full text-white flex items-center gap-2 text-base tracking-wide bg-pink-600 hover:bg-pink-700  transition-all"
                            >
                                <AiFillEdit size={20} /> Edit
                            </Link>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => {
                                    setOpen(true);
                                    setPreview(
                                        course?.lessons[0]?.video?.Location
                                    );
                                }}
                                className="border-2 border-white px-5 py-2 rounded-full text-white tracking-wider flex items-center justify-center gap-2 text-base hover:bg-white hover:text-black transition-all"
                            >
                                <BsPlayFill size={25} /> Watch Promo
                            </button>
                            <button className="px-5 py-3 rounded-full text-white flex items-center gap-2 text-base tracking-wide bg-pink-600 hover:bg-pink-700  transition-all">
                                <BsCart4 size={20} /> Enrole in course for ${" "}
                                <b>{course?.price}</b>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseDetailsHeader;
