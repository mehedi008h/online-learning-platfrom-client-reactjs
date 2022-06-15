import React from "react";

const Instructor = ({ course }) => {
    return (
        <div className="bg-gray-50">
            <div className="w-3/5 mx-auto py-6">
                <h1 className="font-semibold text-xl">Your Instructor</h1>
                <div className="grid md:grid-cols-12 grid-cols-none gap-6 my-6">
                    <div className="col-span-3 mx-auto">
                        <img
                            className="h-28 w-28 rounded-full object-cover border-4 border-gray-300"
                            src="https://res.cloudinary.com/mehedi08h/image/upload/v1649222197/protflio/Mehedi_nzbvvj.jpg"
                            alt={course?.instructor?.name}
                        />
                        <h3 className=" font-bold text-center my-2">
                            {course?.instructor?.name}
                        </h3>
                    </div>
                    <div className="px-4 col-span-9">
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
