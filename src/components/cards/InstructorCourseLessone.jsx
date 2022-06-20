import React from "react";
import { FcVideoCall } from "react-icons/fc";

const InstructorCourseLessone = ({
    course,
    setOpen,
    setPreview,
    setOpenLessone,
    setlessone,
    handleDeleteLesson,
}) => {
    return (
        <div>
            <h1 className="font-semibold text-xl">Course Curriculum</h1>
            <div className="my-6">
                {course?.lessons &&
                    course?.lessons.map((lessone, index) => (
                        <div
                            key={lessone?._id}
                            className="my-2 bg-gray-300 hover:bg-gray-400 transition-all py-2 px-4"
                        >
                            <div className="grid grid-cols-12 ">
                                <div className="col-span-1">
                                    <FcVideoCall size={25} />
                                </div>
                                <div className="col-span-8">
                                    <p>{lessone?.title}</p>
                                </div>
                                <div className="col-span-3 flex flex-row gap-2 justify-end">
                                    <button
                                        onClick={() => {
                                            setOpen(true);
                                            setPreview(
                                                lessone?.video?.Location
                                            );
                                        }}
                                        className=" bg-pink-600 text-white rounded-sm px-4"
                                    >
                                        Start
                                    </button>
                                    <button
                                        onClick={() => {
                                            setOpenLessone(true);
                                            setlessone(lessone && lessone);
                                        }}
                                        className=" bg-pink-600 text-white rounded-sm px-4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteLesson(index, lessone)
                                        }
                                        className=" bg-pink-600 text-white rounded-sm px-4"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default InstructorCourseLessone;
