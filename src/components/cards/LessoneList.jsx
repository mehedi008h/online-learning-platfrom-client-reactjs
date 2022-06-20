import React from "react";
import { AiFillCheckCircle, AiFillMinusCircle } from "react-icons/ai";

const LessoneList = ({ lessons, setLessone, completedLessons }) => {
    return (
        <div className="bg-white p-4 shadow rounded-md">
            <h1 className="font-semibold text-xl">
                Lessone <b>{lessons?.length}</b>
            </h1>
            <hr className="my-4 border-green-500" />
            <div>
                {lessons &&
                    lessons.map((lesson) => (
                        <div
                            onClick={() => setLessone(lesson)}
                            className="py-1 px-2 my-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
                            key={lesson?._id}
                        >
                            <div className="flex gap-4 items-center">
                                {completedLessons &&
                                completedLessons?.includes(lesson?._id) ? (
                                    <AiFillCheckCircle color="green" />
                                ) : (
                                    <AiFillMinusCircle color="black" />
                                )}

                                <h3 className="text-lg max-w-max">
                                    {lesson?.title}
                                </h3>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default LessoneList;
