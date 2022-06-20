import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, getCourseDetails } from "../../actions/courseActions";
import CoursePlayer from "../../components/cards/CoursePlayer";
import LessoneList from "../../components/cards/LessoneList";
import Loader from "../../components/layout/loader/Loader";

const UserCourseDetails = () => {
    const [lessone, setLessone] = useState({});
    const { loading, error, course } = useSelector(
        (state) => state.courseDetails
    );

    const dispatch = useDispatch();
    let { slug } = useParams();

    useEffect(() => {
        dispatch(getCourseDetails(slug));

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, slug, error]);
    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="md:w-4/5 lg:w-4/5  w-full sm:px-4 px-4 md:px-0 lg:px-0 mx-auto mt-20 mb-6">
                {loading ? (
                    <>
                        <Loader />
                    </>
                ) : (
                    <>
                        <div className="grid md:grid-cols-12 lg:grid-cols-12 gap-4 grid-cols-none">
                            <div className="md:col-span-8 lg:col-span-8 col-span-12">
                                <CoursePlayer lessone={lessone} />
                            </div>
                            <div className="md:col-span-4 lg:col-span-4 col-span-12">
                                <LessoneList
                                    lessons={course?.lessons}
                                    setLessone={setLessone}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserCourseDetails;
