import axios from "axios";
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
    const [completedLessons, setCompletedLessons] = useState([]);
    // force state update
    const [updateState, setUpdateState] = useState(false);

    const { loading, error, course } = useSelector(
        (state) => state.courseDetails
    );

    const dispatch = useDispatch();
    let { slug } = useParams();

    const loadCompletedLessons = async () => {
        const { data } = await axios.post(`/api/list-completed`, {
            courseId: course._id,
        });
        console.log("COMPLETED LESSONS => ", data);
        setCompletedLessons(data);
    };

    const markCompleted = async () => {
        const { data } = await axios.post(`/api/mark-completed`, {
            courseId: course._id,
            lessonId: lessone._id,
        });
        console.log(data);
        setCompletedLessons([...completedLessons, lessone._id]);
    };

    const markIncompleted = async () => {
        try {
            const { data } = await axios.post("/api/mark-incomplete", {
                courseId: course._id,
                lessonId: lessone._id,
            });
            console.log(data);
            const all = completedLessons;
            console.log("ALL => ", all);
            const index = all.indexOf(lessone._id);
            if (index > -1) {
                all.splice(index, 1);
                console.log("ALL WITHOUT REMOVED => ", all);
                setCompletedLessons(all);
                setUpdateState(!updateState);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        dispatch(getCourseDetails(slug));

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (course) loadCompletedLessons();
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
                                <CoursePlayer
                                    lessone={lessone}
                                    markCompleted={markCompleted}
                                    markIncompleted={markIncompleted}
                                    completedLessons={completedLessons}
                                />
                            </div>
                            <div className="md:col-span-4 lg:col-span-4 col-span-12">
                                <LessoneList
                                    lessons={course?.lessons}
                                    setLessone={setLessone}
                                    completedLessons={completedLessons}
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
