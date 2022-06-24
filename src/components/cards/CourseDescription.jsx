import React from "react";

const CourseDescription = ({ course }) => {
    return (
        <div className="flex bg-gray-50">
            <div className="md:w-3/5 lg:w-3/5 w-full px-6 md:px-0 lg:px-0 mx-auto my-10">
                <h1 className="font-semibold text-xl">Course Description :</h1>
                <p className="my-6 text-gray-600 text-base tracking-wider">
                    {course?.description}
                </p>
            </div>
        </div>
    );
};

export default CourseDescription;
