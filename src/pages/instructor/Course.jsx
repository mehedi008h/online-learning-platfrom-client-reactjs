import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ImFilesEmpty } from "react-icons/im";
import {
    clearErrors,
    getInstructorCourses,
} from "../../actions/instructorActions";
import InstructorCourseCard from "../../components/cards/InstructorCourseCard";
import Loader from "../../components/layout/loader/Loader";
import MetaData from "../../components/layout/MetaData";

const Course = () => {
    const dispatch = useDispatch();

    // instructor course state
    const { loading, error, courses } = useSelector(
        (state) => state.instructorCourse
    );
    // console.log("Instrocur", courses);

    useEffect(() => {
        dispatch(getInstructorCourses());

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error]);
    return (
        <div className="flex bg-gray-200 min-h-screen">
            <MetaData title={"Instructor Courses"} />
            <div className="md:w-3/4 w-4/5 mx-auto mt-20 mb-8">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold tracking-wide">
                        Total Course : <b>{courses?.length}</b>
                    </h3>
                    <Link
                        to="/instructor/course/new"
                        className="bg-green-600 bg-opacity-20 text-green-700 font-semibold text-base hover:bg-opacity-25  py-1 px-4 rounded-md"
                    >
                        Create Course
                    </Link>
                </div>
                <hr className="my-4 border-green-600" />
                {loading ? (
                    <>
                        <Loader />
                    </>
                ) : (
                    <>
                        <div className="grid md:grid-cols-12 grid-cols-none gap-8">
                            {courses?.length === 0 && (
                                <div className="w-full">
                                    <ImFilesEmpty
                                        className="absolute right-1/2 top-1/2"
                                        size={60}
                                    />
                                </div>
                            )}
                            {courses &&
                                courses.map((course) => (
                                    <div
                                        key={course._id}
                                        className="col-span-4"
                                    >
                                        <InstructorCourseCard course={course} />
                                    </div>
                                ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Course;
