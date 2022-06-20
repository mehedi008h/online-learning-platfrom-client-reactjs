import React from "react";
import ReactPlayer from "react-player";
import { BsPlayCircle } from "react-icons/bs";

const CoursePlayer = ({
    lessone,
    markIncompleted,
    markCompleted,
    completedLessons,
}) => {
    console.log("Lessone :", lessone);
    return (
        <div className="p-2 rounded-md bg-white">
            {lessone?.video ? (
                <>
                    <ReactPlayer
                        url={lessone?.video?.Location}
                        width="100%"
                        height=""
                        controls
                    />
                    <div className="p-4">
                        <span>
                            {completedLessons?.includes(lessone?._id) ? (
                                <span
                                    className="float-right cursor-pointer text-base text-red-500"
                                    onClick={markIncompleted}
                                >
                                    Mark as incomplete
                                </span>
                            ) : (
                                <span
                                    className="float-right cursor-pointer text-base text-blue-500"
                                    onClick={markCompleted}
                                >
                                    Mark as completed
                                </span>
                            )}
                        </span>
                        <h3 className="text-xl">{lessone?.title}</h3>
                        <p className="my-4 text-gray-500">{lessone?.content}</p>
                    </div>
                </>
            ) : (
                <>
                    <div className="h-96 flex flex-col justify-center items-center">
                        <BsPlayCircle size={60} />
                        <h1 className="mt-8 text-2xl">
                            Click One Lessone to play Video
                        </h1>
                    </div>
                </>
            )}
        </div>
    );
};

export default CoursePlayer;
