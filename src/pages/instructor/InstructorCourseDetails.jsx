import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import {
    addLessone,
    clearErrors,
    getCourseDetails,
    publishCourse,
    unpublishCourse,
} from "../../actions/courseActions";
import { enrolledStudentCount } from "../../actions/instructorActions";
import CourseDescription from "../../components/cards/CourseDescription";
import CourseLessone from "../../components/cards/CourseLessone";
import CourseTools from "../../components/cards/CourseTools";
import InstructorCourseDetailsHeader from "../../components/cards/InstructorCourseDetailsHeader";
import Loader from "../../components/layout/loader/Loader";
import AddLessoneModal from "../../components/modal/AddLessoneModal";
import PreviewModal from "../../components/modal/PreviewModal";
import {
    ADD_LESSONE_RESET,
    COURSE_PUBLISH_RESET,
} from "../../constants/courseConstants";

const InstructorCourseDetails = () => {
    const [open, setOpen] = useState(false);
    const [preview, setPreview] = useState("");

    // for lessons
    const [visible, setVisible] = useState(false);
    const [values, setValues] = useState({
        title: "",
        content: "",
        video: {},
    });
    const [uploading, setUploading] = useState(false);
    const [uploadButtonText, setUploadButtonText] = useState("Upload Video");
    const [progress, setProgress] = useState(0);

    // course details state
    const { loading, error, course } = useSelector(
        (state) => state.courseDetails
    );

    // add lessone state
    const { loading: lessoneLoading, success } = useSelector(
        (state) => state.addLessone
    );

    // course publish unpublish state
    const { loading: publishLoading, message } = useSelector(
        (state) => state.coursePublish
    );

    // course enrolled students state
    const { students } = useSelector((state) => state.studentCount);

    const dispatch = useDispatch();
    let { slug } = useParams();

    // FUNCTIONS FOR ADD LESSON
    const handleAddLesson = async (e) => {
        e.preventDefault();

        const lessoneData = {
            title: values?.title,
            content: values?.content,
            video: values?.video,
        };

        dispatch(addLessone(slug, course?.instructor?._id, lessoneData));
    };

    const handleVideo = async (e) => {
        try {
            const file = e.target.files[0];
            setUploadButtonText(file.name);
            setUploading(true);

            const videoData = new FormData();
            videoData.append("video", file);
            // save progress bar and send video as form data to backend
            const { data } = await axios.post(
                `/api/course/video-upload/${course.instructor._id}`,
                videoData,
                {
                    onUploadProgress: (e) => {
                        setProgress(Math.round((100 * e.loaded) / e.total));
                    },
                }
            );
            // once response is received

            setValues({ ...values, video: data });
            setUploading(false);
        } catch (err) {
            setUploading(false);
            toast.error("Video upload failed");
        }
    };

    const handleVideoRemove = async () => {
        try {
            setUploading(true);
            const { data } = await axios.post(
                `/api/course/video-remove/${course.instructor._id}`,
                values.video
            );

            setValues({ ...values, video: {} });
            setUploading(false);
            setUploadButtonText("Upload another video");
        } catch (err) {
            setUploading(false);
            toast("Video remove failed");
        }
    };

    // FUNCTIONS FOR PUBLISH COURSE
    const handlePublish = async (courseId) => {
        swal({
            title: "Are you sure?",
            text: "Once Publish, your course will be live!",
            icon: "warning",
            buttons: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(publishCourse(courseId));
                swal("Poof! Your course will live!", {
                    icon: "success",
                });
            } else {
                swal("Your course not Publish!");
            }
        });
    };

    // FUNCTIONS FOR UNPUBLISH COURSE
    const handleUnpublish = async (courseId) => {
        swal({
            title: "Are you sure?",
            text: "Once Unpublish, your course will not be live!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(unpublishCourse(courseId));
                swal("Poof! Your course will be unpublish", {
                    icon: "success",
                });
            } else {
                swal("Your course live yet!");
            }
        });
    };

    useEffect(() => {
        dispatch(getCourseDetails(slug));

        dispatch(enrolledStudentCount(course?._id));

        if (error) {
            console.log(error);
            dispatch(clearErrors());
        }

        if (success) {
            toast.success("Lessone Added Successfully.");
            setVisible(false);
            dispatch({ type: ADD_LESSONE_RESET });
        }

        if (message) {
            dispatch({ type: COURSE_PUBLISH_RESET });
        }
    }, [dispatch, slug, error, success, message, course?._id]);

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
                            <InstructorCourseDetailsHeader
                                course={course}
                                setOpen={setOpen}
                                setPreview={setPreview}
                            />
                            <CourseTools
                                course={course}
                                students={students}
                                setVisible={setVisible}
                                handlePublish={handlePublish}
                                handleUnpublish={handleUnpublish}
                                publishLoading={publishLoading}
                            />

                            <CourseDescription course={course} />

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
                        {visible && (
                            <div
                                className="fixed z-40"
                                style={{ top: "20%", right: "25%" }}
                            >
                                <AddLessoneModal
                                    setVisible={setVisible}
                                    values={values}
                                    setValues={setValues}
                                    handleAddLesson={handleAddLesson}
                                    uploading={uploading}
                                    uploadButtonText={uploadButtonText}
                                    handleVideo={handleVideo}
                                    progress={progress}
                                    handleVideoRemove={handleVideoRemove}
                                    lessoneLoading={lessoneLoading}
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
