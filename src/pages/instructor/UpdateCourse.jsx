import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import {
    clearErrors,
    deleteLessone,
    getCourseDetails,
    updateCourse,
    updateLessone,
} from "../../actions/courseActions";
import InstructorCourseLessone from "../../components/cards/InstructorCourseLessone";
import CourseForm from "../../components/forms/CourseForm";
import Loader from "../../components/layout/loader/Loader";
import EditLessoneModal from "../../components/modal/EditLessoneModal";
import PreviewModal from "../../components/modal/PreviewModal";
import {
    DELETE_LESSONE_RESET,
    UPDATE_COURSE_RESET,
} from "../../constants/courseConstants";

const UpdateCourse = () => {
    const { loading, error, course } = useSelector(
        (state) => state.courseDetails
    );

    const { isUpdated, isDeleted } = useSelector((state) => state.courseAction);

    // state
    // video preview
    const [open, setOpen] = useState(false);
    const [preview, setPreview] = useState("");

    // edit lessone
    const [openLessone, setOpenLessone] = useState(false);
    const [lessone, setlessone] = useState({});
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);

    const [values, setValues] = useState(course);

    const [image, setImage] = useState(course?.image);
    const [imagePreview, setImagePreview] = useState(course?.image?.Location);
    const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

    // router
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { slug } = useParams();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        let file = e.target.files[0];
        setImagePreview(window.URL.createObjectURL(file));
        setUploadButtonText(file.name);
        // resize
        Resizer.imageFileResizer(
            file,
            720,
            500,
            "JPEG",
            100,
            0,
            async (uri) => {
                try {
                    let { data } = await axios.post(
                        "/api/course/upload-image",
                        {
                            image: uri,
                        }
                    );
                    console.log("IMAGE UPLOADED", data);
                    // set image in the state
                    setImage(data);
                } catch (err) {
                    console.log(err);
                }
            }
        );
    };

    const handleImageRemove = async () => {
        try {
            const res = await axios.post("/api/course/remove-image", { image });
            setImage({});
            setImagePreview("");
            setUploadButtonText("Upload Image");
        } catch (err) {
            console.log(err);
        }
    };

    // update
    const handleSubmit = async (e) => {
        e.preventDefault();

        const courseData = {
            ...values,
            image: image,
        };

        dispatch(updateCourse(slug, courseData));
    };

    const handleVideo = async (e) => {
        // remove previous video
        if (lessone?.video && lessone?.video.Location) {
            const res = await axios.post(
                `/api/course/video-remove/${course?.instructor?._id}`,
                lessone?.video
            );
        }
        // upload
        try {
            const file = e.target.files[0];
            setUploadButtonText(file.name);
            setUploading(true);

            const videoData = new FormData();
            videoData.append("video", file);
            // save progress bar and send video as form data to backend
            const { data } = await axios.post(
                `/api/course/video-upload/${course?.instructor?._id}`,
                videoData,
                {
                    onUploadProgress: (e) => {
                        setProgress(Math.round((100 * e.loaded) / e.total));
                    },
                }
            );
            // once response is received

            setlessone({ ...lessone, video: data });
            setUploading(false);
        } catch (err) {
            setUploading(false);
            toast.error("Video upload failed");
        }
        // once response is received
    };

    const handleUpdateLesson = async (e) => {
        e.preventDefault();

        dispatch(updateLessone(slug, lessone?._id, lessone));
        setOpenLessone(false);
    };

    const handleDeleteLesson = async (lessoneId) => {
        dispatch(deleteLessone(slug, lessoneId));
    };

    useEffect(() => {
        dispatch(getCourseDetails(slug));

        if (isUpdated) {
            toast.success("Course Update Successfully.");
            navigate(`/instructor/course/${slug}`);
            dispatch({ type: UPDATE_COURSE_RESET });
        }

        if (isDeleted) {
            toast.success("Lessone Delete Successfully.");
            navigate(`/instructor/course/${slug}`);
            dispatch({ type: DELETE_LESSONE_RESET });
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, slug, error, isUpdated, isDeleted, navigate]);
    return (
        <div className="relative">
            <div
                className="h-60 flex items-center justify-start"
                style={{ background: "#494d67" }}
            >
                <div className="w-4/5 mx-auto">
                    <h1 className="text-white text-lg">Update / {slug}</h1>
                </div>
            </div>
            {loading ? (
                <>
                    <Loader />
                </>
            ) : (
                <>
                    <div className="flex flex-col w-full bg-gray-100">
                        <div className="md:w-2/5 w-4/5 mx-auto my-8">
                            <CourseForm
                                handleSubmit={handleSubmit}
                                handleImage={handleImage}
                                handleChange={handleChange}
                                values={values}
                                setValues={setValues}
                                preview={imagePreview}
                                uploadButtonText={uploadButtonText}
                                handleImageRemove={handleImageRemove}
                            />
                        </div>
                        <div className="my-8 w-3/4 mx-auto">
                            <InstructorCourseLessone
                                course={course}
                                setOpen={setOpen}
                                setPreview={setPreview}
                                setlessone={setlessone}
                                setOpenLessone={setOpenLessone}
                                handleDeleteLesson={handleDeleteLesson}
                            />
                        </div>
                    </div>
                    {open && (
                        <div
                            className="fixed z-40"
                            style={{ top: "20%", right: "25%" }}
                        >
                            <PreviewModal setOpen={setOpen} preview={preview} />
                        </div>
                    )}
                    {openLessone && (
                        <div
                            className="fixed z-40"
                            style={{ top: "10%", right: "25%" }}
                        >
                            <EditLessoneModal
                                setOpenLessone={setOpenLessone}
                                lessone={lessone}
                                setlessone={setlessone}
                                handleUpdateLesson={handleUpdateLesson}
                                handleVideo={handleVideo}
                                uploadButtonText={uploadButtonText}
                                progress={progress}
                                uploading={uploading}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default UpdateCourse;
