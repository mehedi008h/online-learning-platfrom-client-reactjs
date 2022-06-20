import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, getCourseDetails } from "../../actions/courseActions";
import CourseDescription from "../../components/cards/CourseDescription";
import CourseLessone from "../../components/cards/CourseLessone";
import InstructorCourseDetailsHeader from "../../components/cards/InstructorCourseDetailsHeader";
import Loader from "../../components/layout/loader/Loader";
import AddLessoneModal from "../../components/modal/AddLessoneModal";
import PreviewModal from "../../components/modal/PreviewModal";

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

    // student count
    const [students, setStudents] = useState(0);

    const { loading, error, course } = useSelector(
        (state) => state.courseDetails
    );

    const dispatch = useDispatch();
    let { slug } = useParams();

    const studentCount = async () => {
        const { data } = await axios.post(`/api/instructor/student-count`, {
            courseId: course._id,
        });
        setStudents(data.length);
    };

    // FUNCTIONS FOR ADD LESSON
    const handleAddLesson = async (e) => {
        e.preventDefault();
        // console.log(values);
        try {
            const { data } = await axios.post(
                `/api/course/lesson/${slug}/${course.instructor._id}`,
                values
            );
            // console.log(data)
            setVisible(false);
            setUploadButtonText("Upload video");
            toast("Lesson added");
            setValues({ ...values, title: "", content: "", video: {} });
        } catch (err) {
            toast("Lesson add failed");
        }
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
            toast("Video upload failed");
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

    const handlePublish = async (e, courseId) => {
        try {
            let answer = window.confirm(
                "Once you publsih your course, it will be live in the marketplace for users to enroll"
            );
            if (!answer) return;
            const { data } = await axios.put(`/api/course/publish/${courseId}`);
            toast("Congrats! Your course is live");
            dispatch(getCourseDetails(courseId));
        } catch (err) {
            toast("Course publish failed. Try again");
        }
    };

    const handleUnpublish = async (e, courseId) => {
        try {
            let answer = window.confirm(
                "Once you unpublsih your course, it will no be available for users to enroll"
            );
            if (!answer) return;
            const { data } = await axios.put(
                `/api/course/unpublish/${courseId}`
            );

            toast("Your course is unpublished");
            dispatch(getCourseDetails(courseId));
        } catch (err) {
            toast("Course publish failed. Try again");
        }
    };

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
                            <InstructorCourseDetailsHeader
                                course={course}
                                setOpen={setOpen}
                                setPreview={setPreview}
                            />
                            <div className="w-3/5 mx-auto my-6">
                                <div className="flex gap-4 justify-center sm:flex-col md:flex-row lg:flex-row">
                                    <button
                                        onClick={() => setVisible(true)}
                                        className="bg-green-500 py-1 px-4 rounded-full text-white"
                                    >
                                        Add Lessone
                                    </button>

                                    {course?.published ? (
                                        <>
                                            <button
                                                onClick={(e) =>
                                                    handleUnpublish(
                                                        e,
                                                        course._id
                                                    )
                                                }
                                                className="bg-green-500 py-1 px-4 rounded-full text-white"
                                            >
                                                Unpublish
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={(e) =>
                                                    handlePublish(e, course._id)
                                                }
                                                className="bg-green-500 py-1 px-4 rounded-full text-white"
                                            >
                                                Publish
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
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
