import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearErrors, getCourseDetails } from "../../actions/courseActions";
import CourseForm from "../../components/forms/CourseForm";

const UpdateCourse = () => {
    const { loading, error, course } = useSelector(
        (state) => state.courseDetails
    );

    // state
    const [values, setValues] = useState({
        name: course.name,
        description: course.description,
        price: course.price,
        uploading: false,
        paid: true,
        category: course.category,
        loading: false,
    });

    console.log("Values : ", values);

    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("");
    const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

    // router
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { slug } = useParams();

    useEffect(() => {
        dispatch(getCourseDetails(slug));

        if (error) {
            console.log(error);
            dispatch(clearErrors());
        }
    }, [dispatch, slug, error]);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {};

    const handleImageRemove = async () => {};

    const handleSubmit = async (e) => {
        e.preventDefault();
    };
    return (
        <div className="">
            <div
                className="h-60 flex items-center justify-start"
                style={{ background: "#494d67" }}
            >
                <div className="w-4/5 mx-auto">
                    <h1 className="text-white text-lg">Update / {slug}</h1>
                </div>
            </div>
            <div className="flex w-full bg-gray-100">
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
        </div>
    );
};

export default UpdateCourse;
