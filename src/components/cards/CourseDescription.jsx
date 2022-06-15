import React from "react";

const CourseDescription = ({ course }) => {
    return (
        <div>
            <h1 className="font-semibold text-xl">Course Description :</h1>
            <p className="my-6 text-gray-600 text-base tracking-wider">
                {course?.description}
            </p>
        </div>
    );
};

export default CourseDescription;
