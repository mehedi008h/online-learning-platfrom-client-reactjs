import React from "react";
import { Link } from "react-router-dom";
import ButtonLoader from "../layout/buttonLoader/ButtonLoader";

const CourseTools = ({
    course,
    setVisible,
    handleUnpublish,
    handlePublish,
    publishLoading,
}) => {
    return (
        <div>
            <div className="w-3/5 mx-auto my-12">
                <div className="flex  gap-4 justify-center flex-col sm:flex-col md:flex-row lg:flex-row">
                    <button
                        onClick={() => setVisible(true)}
                        className="bg-green-500 py-2 px-4 rounded-full text-white"
                    >
                        Add Lessone
                    </button>
                    <Link
                        to={`/instructor/course/update/${course?.slug}`}
                        className="bg-green-500 py-2 px-4 rounded-full text-center text-white"
                    >
                        Update
                    </Link>

                    {course?.published ? (
                        <>
                            <button
                                onClick={() => handleUnpublish(course?._id)}
                                className="bg-green-500 py-2 px-4 rounded-full text-white"
                            >
                                {publishLoading ? (
                                    <ButtonLoader />
                                ) : (
                                    "Unpublish"
                                )}
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => handlePublish(course?._id)}
                                className="bg-green-500 py-1 px-4 rounded-full text-white"
                            >
                                {publishLoading ? <ButtonLoader /> : "Publish"}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseTools;
