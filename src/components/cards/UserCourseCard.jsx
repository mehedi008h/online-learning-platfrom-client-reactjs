import React from "react";
import { Link } from "react-router-dom";

const UserCourseCard = ({ course }) => {
    return (
        <Link to={`/user/course/${course?.slug}`}>
            <div className="p-2 bg-white rounded-md">
                <div className="">
                    <img
                        src={course?.image?.Location}
                        className="w-full h-44 object-cover rounded-md"
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
                        <p className="font-semibold">
                            Lessone {course?.lessons?.length}
                        </p>
                        <p className="text-pink-500 font-bold">
                            {course?.category}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default UserCourseCard;
