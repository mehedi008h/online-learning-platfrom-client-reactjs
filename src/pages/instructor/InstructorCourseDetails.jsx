import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getCourseDetails } from "../../actions/courseActions";
import CourseDescription from "../../components/cards/CourseDescription";
import CourseDetailsHeader from "../../components/cards/CourseDetailsHeader";
import CourseLessone from "../../components/cards/CourseLessone";
import Loader from "../../components/layout/loader/Loader";
import PreviewModal from "../../components/modal/PreviewModal";

const InstructorCourseDetails = () => {
    const [open, setOpen] = useState(false);
    const [preview, setPreview] = useState("");

    const { loading, error, course } = useSelector(
        (state) => state.courseDetails
    );

    const dispatch = useDispatch();
    let { slug } = useParams();

    useEffect(() => {
        dispatch(getCourseDetails(slug));

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
                            />
                            <div className="w-3/5 mx-auto my-6">
                                <CourseDescription course={course} />
                            </div>

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

export default InstructorCourseDetails;
