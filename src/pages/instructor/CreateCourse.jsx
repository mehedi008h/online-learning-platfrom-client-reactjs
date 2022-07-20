import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseForm from "../../components/forms/CourseForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, newCourse } from "../../actions/courseActions";
import { NEW_COURSE_RESET } from "../../constants/courseConstants";
import { useEffect } from "react";
import axios from "axios";

const CreateCourse = () => {
    const { loading, error, success } = useSelector((state) => state.newCourse);

    // state
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "9.99",
        uploading: false,
        paid: true,
        category: "",
        loading: loading,
    });

    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("");
    const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

    // router
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        let file = e.target.files[0];
        setPreview(window.URL.createObjectURL(file));
        setUploadButtonText(file.name);
        setValues({ ...values, loading: true });
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
                    setValues({ ...values, loading: false });
                } catch (err) {
                    console.log(err);
                    setValues({ ...values, loading: false });
                    toast("Image upload failed. Try later.");
                }
            }
        );
    };

    const handleImageRemove = async () => {
        try {
            // console.log(values);

            setValues({ ...values, loading: true });
            const res = await axios.post("/api/course/remove-image", {
                image,
            });
            setImage({});
            setPreview("");
            setUploadButtonText("Upload Image");
            setValues({ ...values, loading: false });
        } catch (err) {
            console.log(err);
            setValues({ ...values, loading: false });
            toast("Image upload failed. Try later.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name: values?.name,
            price: values?.price,
            description: values?.description,
            category: values?.category,
            paid: values?.paid,
            image: image,
        };

        dispatch(newCourse(formData));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            navigate("/instructor");
            toast.success("Course created successfully");
            dispatch({ type: NEW_COURSE_RESET });
        }
    }, [dispatch, error, success, navigate]);
    return (
        <div className="relative">
            <div
                className="h-60 flex items-center justify-start"
                style={{ background: "#494d67" }}
            >
                <div className="w-4/5 mx-auto">
                    <h1 className="text-white text-lg"> Create Course</h1>
                </div>
            </div>
            <div className="md:w-2/5 w-4/5 mx-auto my-8">
                <CourseForm
                    handleSubmit={handleSubmit}
                    handleImage={handleImage}
                    handleChange={handleChange}
                    values={values}
                    setValues={setValues}
                    preview={preview}
                    uploadButtonText={uploadButtonText}
                    handleImageRemove={handleImageRemove}
                />
            </div>
        </div>
    );
};

export default CreateCourse;
