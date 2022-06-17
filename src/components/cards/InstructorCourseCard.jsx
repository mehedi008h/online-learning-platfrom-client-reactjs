import React from "react";
import { Link } from "react-router-dom";

const InstructorCourseCard = ({ course }) => {
    return (
        <Link to={`/instructor/course/${course?.slug}`}>
            <div className="p-2 bg-white shadow rounded-md">
                <div className="relative">
                    <img
                        src={course?.image?.Location}
                        className="w-full h-44 object-cover"
                        alt={course?.name}
                    />
                    <p
                        className={`absolute top-3 right-3 z-10 ${
                            course?.published ? "bg-green-500" : "bg-red-500"
                        }  bg-opacity-25 shadow py-1 px-4 text-gray-200 rounded-full text-opacity-100`}
                    >
                        {course?.published ? "Published" : "Unpublish"}
                    </p>
                </div>
                <div className="mt-4 px-4 py-2">
                    <h1 className="font-medium text-lg h-12 overflow-hidden">
                        {course?.name}
                    </h1>
                    <p className="h-24 mt-4 overflow-hidden text-gray-500 text-base">
                        {course?.description}
                    </p>
                    <div className="flex justify-between mt-4">
                        <p className="font-semibold">
                            Lessone {course?.lessons?.length}
                        </p>
                        <p className="text-pink-500 font-bold">
                            {course?.price ? `$ ${course?.price}` : "Free"}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default InstructorCourseCard;
