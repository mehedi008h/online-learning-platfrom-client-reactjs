import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import {
    checkEnrollment,
    clearErrors,
    freeEnrollment,
    getCourseDetails,
} from "../../actions/courseActions";
import CourseDescription from "../../components/cards/CourseDescription";
import CourseDetailsHeader from "../../components/cards/CourseDetailsHeader";
import CourseLessone from "../../components/cards/CourseLessone";
import Instructor from "../../components/cards/Instructor";
import Loader from "../../components/layout/loader/Loader";
import PreviewModal from "../../components/modal/PreviewModal";
import MetaData from "../../components/layout/MetaData";
import { axiosInstance } from "../../config";

const CourseDetails = () => {
    const [open, setOpen] = useState(false);
    const [preview, setPreview] = useState("");

    // course details state
    const { loading, error, course } = useSelector(
        (state) => state.courseDetails
    );

    // user state
    const { user } = useSelector((state) => state.auth);
    // user state
    const { status } = useSelector((state) => state.checkEnroll);

    // enroll state
    const { success } = useSelector((state) => state.enrollment);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { slug } = useParams();

    const handlePaidEnrollment = async (e) => {
        e.preventDefault();

        try {
            if (!user) return navigate("/login");
            // if user is already enrolled, redirect to course page
            if (status) return navigate(`/user/course/${course?.slug}`);

            // dispatch(paidEnrollment(course?._id));
            // console.log("enroll to this course > ", course._id);
            const { data } = await axiosInstance.post(
                `/api/paid-enrollment/${course._id}`
            );

            // load stripe for payment
            // on successful payment, user will get redirected to /stripe/success page
            let stripe = await loadStripe(
                "pk_test_51KN85iIdr2NcIiWHKR9b6xuQX7E2gWa2TjyfOnusxouxuSfZynEsFHkC5JaHIIRVzjwOey68JexeEh5ge8CfMl1d00G4PHnGdk"
            );
            stripe.redirectToCheckout({ sessionId: data.id });
        } catch (err) {
            toast.error("Enrollment failed, Try again.");
        }
    };

    // free enrollment course
    const handleFreeEnrollment = async (e) => {
        e.preventDefault();

        try {
            if (!user) return navigate("/login");
            // if user is already enrolled, redirect to course page
            if (status) return navigate(`/user/course/${course?.slug}`);
            // console.log("enroll to this course > ", course._id);
            dispatch(freeEnrollment(course?._id));

            // redirect user to course page
            // navigate(`/user/course/${data.course.slug}`);
        } catch (err) {
            toast.error("Enrollment failed, Try again.");
        }
    };

    useEffect(() => {
        dispatch(getCourseDetails(slug));

        if (user) {
            dispatch(checkEnrollment(slug));
        }

        if (success) {
            toast.success("Successfully enroled course.");
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, slug, user, success, error]);

    useEffect(() => {}, [dispatch, user]);

    return (
        <div className="mt-16">
            {loading ? (
                <>
                    <Loader />
                </>
            ) : (
                <>
                    <div className="w-full relative">
                        <MetaData title={course?.name} />
                        <div className="">
                            <CourseDetailsHeader
                                course={course}
                                setOpen={setOpen}
                                setPreview={setPreview}
                                handleFreeEnrollment={handleFreeEnrollment}
                                handlePaidEnrollment={handlePaidEnrollment}
                                status={status}
                            />

                            <CourseDescription course={course} />

                            <Instructor course={course} />
                            <div className="md:w-3/5 lg:w-3/5 w-full px-6 md:px-0 lg:px-0 mx-auto my-6">
                                <CourseLessone
                                    course={course}
                                    setOpen={setOpen}
                                    setPreview={setPreview}
                                />
                            </div>
                        </div>
                        {open && (
                            <div
                                className="fixed z-40"
                                style={{ top: "20%", right: "25%" }}
                            >
                                <PreviewModal
                                    setOpen={setOpen}
                                    preview={preview}
                                />
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default CourseDetails;
