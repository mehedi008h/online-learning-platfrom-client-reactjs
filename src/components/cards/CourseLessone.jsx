import React from "react";
import { FcVideoCall } from "react-icons/fc";

const CourseLessone = ({ course, setOpen, setPreview }) => {
    return (
        <div>
            <h1 className="font-semibold text-xl">Course Curriculum</h1>
            <div className="my-6">
                {course?.lessons &&
                    course?.lessons.map((lessone) => (
                        <div
                            key={lessone?._id}
                            className="my-2 bg-gray-300 hover:bg-gray-400 transition-all py-2 px-4"
                        >
                            <div className="grid grid-cols-12 ">
                                <div className="md:col-span-1 lg:col-span-1 col-span-2">
                                    <FcVideoCall size={25} />
                                </div>
                                <div className="md:col-span-10 lg:col-span-10 col-span-7">
                                    <p>{lessone?.title}</p>
                                </div>
                                <div className="md:col-span-1 lg:col-span-1 col-span-3">
                                    <button
                                        onClick={() => {
                                            setOpen(true);
                                            setPreview(
                                                lessone?.video?.Location
                                            );
                                        }}
                                        disabled={!lessone?.free_preview}
                                        className={` ${
                                            lessone?.free_preview
                                                ? "bg-pink-600"
                                                : "bg-pink-400"
                                        } text-white rounded-sm px-4`}
                                    >
                                        Start
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            {/* <div className="mt-12 mb-8 flex justify-center">
                <button className="px-5 py-3 rounded-full text-white flex items-center gap-2 text-base tracking-wide bg-pink-600 hover:bg-pink-700  transition-all">
                    <BsCart4 size={20} /> Enrole in course for ${" "}
                    <b>{course?.price}</b>
                </button>
            </div> */}
        </div>
    );
};

export default CourseLessone;
