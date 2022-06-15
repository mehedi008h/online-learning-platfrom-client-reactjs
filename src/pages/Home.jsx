import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../actions/courseActions";
import Course from "../components/cards/Course";
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
                    <div className="w-4/5 mx-auto ">
                        <div className="grid grid-cols-12 gap-4">
                            {courses &&
                                courses.map((course) => (
                                    <div
                                        key={course?._id}
                                        className="col-span-4"
                                    >
                                        <Course course={course} />
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
