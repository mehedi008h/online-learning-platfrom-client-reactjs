import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    clearErrors,
    getCompletedLessone,
    getCourseDetails,
    // markCompleteLessone,
    // markInCompleteLessone,
} from "../../actions/courseActions";
import CoursePlayer from "../../components/cards/CoursePlayer";
import LessoneList from "../../components/cards/LessoneList";
import Loader from "../../components/layout/loader/Loader";
import MetaData from "../../components/layout/MetaData";
import { axiosInstance } from "../../config";
import {
    MARK_COMPLETE_RESET,
    MARK_INCOMPLETE_RESET,
} from "../../constants/courseConstants";

const UserCourseDetails = () => {
    const [lessone, setLessone] = useState([]);

    const { loading, error, course } = useSelector(
        (state) => state.courseDetails
    );

    const {
        loading: lessoneLoading,
        completedLessone,
        complete,
        inComplete,
    } = useSelector((state) => state.lessoneComplete);

    const dispatch = useDispatch();
    let { slug } = useParams();

    const markCompleted = async () => {
        // dispatch(markCompleteLessone(course?._id, lessone?._id));
        const { data } = await axiosInstance.post(`/api/mark-completed`, {
            courseId: course._id,
            lessonId: lessone._id,
        });
        // console.log("Mark Complete :", data);
        dispatch({ type: MARK_COMPLETE_RESET });
        // setCompletedLessons([...completedLessons, lessone._id]);
    };

    const markIncompleted = async () => {
        // dispatch(markInCompleteLessone(course?._id, lessone?._id));
        const { data } = await axiosInstance.post("/api/mark-incomplete", {
            courseId: course._id,
            lessonId: lessone._id,
        });
        // console.log("Mark INComplete :", data);
        dispatch({ type: MARK_INCOMPLETE_RESET });
        // try {
        //     const { data } = await axios.post("/api/mark-incomplete", {
        //         courseId: course._id,
        //         lessonId: lessone._id,
        //     });
        //     console.log("Mark INComplete :", data);
        //     const all = completedLessone;
        //     console.log("ALL => ", all);
        //     const index = all.indexOf(lessone._id);
        //     if (index > -1) {
        //         all.splice(index, 1);
        //         console.log("ALL WITHOUT REMOVED => ", all);
        //         // setCompletedLessons(all);
        //         setUpdateState(!updateState);
        //     }
        // } catch (err) {
        //     console.log(err);
        // }
    };

    useEffect(() => {
        dispatch(getCourseDetails(slug));

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, slug, error]);

    useEffect(() => {
        dispatch(getCompletedLessone(course._id));

        if (complete) {
            alert.success("Mark Complete Success!");
            dispatch({ type: MARK_COMPLETE_RESET });
        }
        if (inComplete) {
            alert.success("Mark Incomplete Success!");
            dispatch({ type: MARK_INCOMPLETE_RESET });
        }
    }, [dispatch, course._id, complete, inComplete]);
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
                            <MetaData title={course?.name} />
                            <div className="md:col-span-8 lg:col-span-8 col-span-12">
                                <CoursePlayer
                                    lessone={lessone}
                                    markCompleted={markCompleted}
                                    markIncompleted={markIncompleted}
                                    completedLessone={completedLessone}
                                    lessoneLoading={lessoneLoading}
                                />
                            </div>
                            <div className="md:col-span-4 lg:col-span-4 col-span-12">
                                <LessoneList
                                    lessons={course?.lessons}
                                    setLessone={setLessone}
                                    completedLessone={completedLessone}
                                    lessoneLoading={lessoneLoading}
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
