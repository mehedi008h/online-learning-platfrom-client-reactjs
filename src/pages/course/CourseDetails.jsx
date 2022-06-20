import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { clearErrors, getCourseDetails } from "../../actions/courseActions";
import CourseDescription from "../../components/cards/CourseDescription";
import CourseDetailsHeader from "../../components/cards/CourseDetailsHeader";
import CourseLessone from "../../components/cards/CourseLessone";
import Instructor from "../../components/cards/Instructor";
import Loader from "../../components/layout/loader/Loader";
import PreviewModal from "../../components/modal/PreviewModal";
import axios from "axios";

const CourseDetails = () => {
    const [open, setOpen] = useState(false);
    const [preview, setPreview] = useState("");

    const [enrolled, setEnrolled] = useState({});

    console.log("Enroll :", enrolled);

    const { loading, error, course } = useSelector(
        (state) => state.courseDetails
    );
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { slug } = useParams();

    const checkEnrollment = async () => {
        const { data } = await axios.get(
            `/api/check-enrollment/${course?._id}`
        );
        setEnrolled(data);
    };

    const handlePaidEnrollment = async (e) => {
        e.preventDefault();

        try {
            if (!user) return navigate("/login");
            // if user is already enrolled, redirect to course page
            if (enrolled.status)
                return navigate(`/user/course/${enrolled.course.slug}`);
            // console.log("enroll to this course > ", course._id);
            const { data } = await axios.post(
                `/api/paid-enrollment/${course._id}`
            );

            console.log("Pay :", data);
            // load stripe for payment
            // on successful payment, user will get redirected to /stripe/success page
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
            stripe.redirectToCheckout({ sessionId: data.id });
        } catch (err) {
            toast("Enrollment failed, Try again.");
        }
    };

    const handleFreeEnrollment = async (e) => {
        e.preventDefault();

        try {
            if (!user) return navigate("/login");
            // if user is already enrolled, redirect to course page
            if (enrolled.status)
                return navigate(`/user/course/${enrolled.course.slug}`);
            // console.log("enroll to this course > ", course._id);
            const { data } = await axios.post(
                `/api/free-enrollment/${course._id}`
            );
            toast(data.message);
            // redirect user to course page
            navigate(`/user/course/${data.course.slug}`);
        } catch (err) {
            toast("Enrollment failed, Try again.");
        }
    };

    useEffect(() => {
        dispatch(getCourseDetails(slug));

        if (user && course) checkEnrollment();

        if (error) {
            console.log(error);
            dispatch(clearErrors());
        }
    }, [dispatch, slug, error]);

    return (
        <div className="mt-16">
            {loading ? (
                <>
                    <Loader />
                </>
            ) : (
                <>
                    <div className="w-full relative">
                        <div className="">
                            <CourseDetailsHeader
                                course={course}
                                setOpen={setOpen}
                                setPreview={setPreview}
                                handleFreeEnrollment={handleFreeEnrollment}
                                handlePaidEnrollment={handlePaidEnrollment}
                                enrolled={enrolled}
                                setEnrolled={setEnrolled}
                            />
                            <div className="w-3/5 mx-auto my-6">
                                <CourseDescription course={course} />
                            </div>
                            <Instructor course={course} />
                            <div className="w-3/5 mx-auto my-6">
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
