import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInstructorCourses } from "../../actions/instructorActions";
import InstructorCourseCard from "../../components/cards/InstructorCourseCard";
import Loader from "../../components/layout/loader/Loader";

const Course = () => {
    const dispatch = useDispatch();
    const { loading, error, courses } = useSelector(
        (state) => state.instructorCourse
    );
    console.log("Instrocur", courses);

    useEffect(() => {
        dispatch(getInstructorCourses());

        if (error) {
            return console.log(error);
        }
    }, [dispatch, error]);
    return (
        <div className="mt-20 mb-8">
            <div className="md:w-3/4 w-4/5 mx-auto">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold tracking-wide">
                        Total Course : <b>{courses?.length}</b>
                    </h3>
                    <button className="bg-green-600 bg-opacity-20 text-green-700 font-semibold text-base hover:bg-opacity-25  py-1 px-4 rounded-md">
                        Create Course
                    </button>
                </div>
                <hr className="my-4 border-green-600" />
                {loading ? (
                    <>
                        <Loader />
                    </>
                ) : (
                    <>
                        <div className="grid md:grid-cols-12 grid-cols-none gap-4">
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
