import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../actions/courseActions";
import CourseCard from "../components/cards/CourseCard";
import Loader from "../components/layout/loader/Loader";

const Home = () => {
    const dispatch = useDispatch();
    const { loading, error, courses } = useSelector((state) => state.course);
    console.log("hfhfh", courses);
    useEffect(() => {
        dispatch(getCourses());

        if (error) {
            return console.log(error);
        }
    }, [dispatch, error]);
    return (
        <div className="mt-20">
            {loading ? (
                <>
                    <Loader />
                </>
            ) : (
                <>
                    <div className="md:w-4/5 lg:w-4/5 w-full px-4 md:px-0 lg:px-0 mx-auto ">
                        <div className="grid md:grid-cols-12 lg:grid-cols-12 grid-cols-none gap-4">
                            {courses &&
                                courses.map((course) => (
                                    <div
                                        key={course?._id}
                                        className="col-span-4"
                                    >
                                        <CourseCard course={course} />
                                    </div>
                                ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
