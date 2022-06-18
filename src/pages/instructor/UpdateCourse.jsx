import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import { clearErrors, getCourseDetails } from "../../actions/courseActions";
import InstructorCourseLessone from "../../components/cards/InstructorCourseLessone";
import CourseForm from "../../components/forms/CourseForm";
import Loader from "../../components/layout/loader/Loader";
import EditLessoneModal from "../../components/modal/EditLessoneModal";
import PreviewModal from "../../components/modal/PreviewModal";

const UpdateCourse = () => {
    const { loading, error, course } = useSelector(
        (state) => state.courseDetails
    );

    // state
    // video preview
    const [open, setOpen] = useState(false);
    const [preview, setPreview] = useState("");

    // edit lessone
    const [openLessone, setOpenLessone] = useState(false);
    const [lessone, setlessone] = useState({});

    const [values, setValues] = useState(course);

    console.log("Values : ", values);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };
            // console.log(values);
            const { data } = await axios.put(`/api/course/${slug}`, {
                ...values,
                image,
                config,
            });
            console.log("Update", data);
            // router.push("/instructor");
        } catch (err) {}
    };

    const handleUpdateLesson = async (e) => {
        e.preventDefault();

        const { data } = await axios.put(
            `/api/course/lesson/${slug}/${lessone._id}`,
            lessone
        );
        setUploadButtonText("Upload video");

        setOpenLessone(false);
        // update lessons
        if (data.ok) {
            let arr = values.lessons;
            const index = arr.findIndex((el) => el._id === lessone._id);
            arr[index] = lessone;
            setValues({ ...values, lessons: arr });
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
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default UpdateCourse;
