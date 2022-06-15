import React from "react";

const Course = ({ course }) => {
    return (
        <div className="p-2 bg-white shadow rounded-md">
            <div>
                <img
                    src={course?.image?.Location}
                    className="w-full h-44 object-cover"
                    alt={course?.name}
                />
            </div>
            <div className="mt-4 px-4 py-2">
                <h1 className="font-medium text-lg h-12 overflow-hidden">
                    {course?.name}
                </h1>
                <p className="h-24 mt-4 overflow-hidden text-gray-500 text-base">
                    {course?.description}
                </p>
                <div className="flex justify-between mt-4">
                    <p className="font-semibold">{course?.instructor?.name}</p>
                    <p className="text-pink-500 font-bold">$ {course?.price}</p>
                </div>
            </div>
        </div>
    );
};

export default Course;
