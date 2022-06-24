import React from "react";

const Instructor = ({ course }) => {
    return (
        <div>
            <div className="md:w-3/5 lg:w-3/5 w-full md:px-0 lg:px-0 px-6 mx-auto py-6">
                <h1 className="font-semibold text-xl">Your Instructor</h1>
                <div className="grid md:grid-cols-12 grid-cols-none gap-6 my-6">
                    <div className="md:col-span-3 lg:col-span-3 col-span-12 mx-auto">
                        <img
                            className="h-28 w-28 rounded-full object-cover border-4 border-gray-300"
                            src="https://res.cloudinary.com/mehedi08h/image/upload/v1649222197/protflio/Mehedi_nzbvvj.jpg"
                            alt={course?.instructor?.name}
                        />
                        <h3 className=" font-bold text-center my-2">
                            {course?.instructor?.name}
                        </h3>
                    </div>
                    <div className="px-4 md:col-span-9 lg:col-span-9  col-span-12">
                        <p className="text-lg tracking-wide">
                            {" "}
                            {course?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Instructor;
