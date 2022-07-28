import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import { getInstructorCourses } from "../../actions/instructorActions";
import ButtonLoader from "../../components/layout/buttonLoader/ButtonLoader";
import Loader from "../../components/layout/loader/Loader";
import {
    clearErrors,
    loadUser,
    updateProfile,
} from "../../actions/authActions";
import { UPDATE_PROFILE_RESET } from "../../constants/authConstants";
import { axiosInstance } from "../../config";
import MetaData from "../../components/layout/MetaData";

const Profile = () => {
    const [edit, setEdit] = useState(false);

    // user state
    const {
        loading,
        user,
        error: userError,
    } = useSelector((state) => state.auth);

    // instructor course state
    const { loading: courseLoading, courses } = useSelector(
        (state) => state.instructorCourse
    );

    const {
        loading: updateLoading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.user);

    const [name, setName] = useState(user?.name);
    const [bio, setBio] = useState(user?.bio);
    const [image, setImage] = useState(user?.picture);
    const [preview, setPreview] = useState(
        user?.picture && user.picture.Location
    );
    const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
    const [imageLoading, setImageLoading] = useState(false);

    const dispatch = useDispatch();
    // console.log("Instrocur", courses);

    const handleImage = (e) => {
        let file = e.target.files[0];
        setPreview(window.URL.createObjectURL(file));
        setUploadButtonText(file.name);
        setImageLoading(true);
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
                    let { data } = await axiosInstance.post(
                        "/api/course/upload-image",
                        {
                            image: uri,
                        }
                    );
                    console.log("IMAGE UPLOADED", data);
                    // set image in the state
                    setImage(data);
                    setImageLoading(false);
                } catch (err) {
                    console.log(err);
                }
            }
        );
    };

    const formData = {
        name: name,
        bio: bio,
        picture: image,
    };

    const handleUpdate = () => {
        dispatch(updateProfile(formData));
    };

    useEffect(() => {
        dispatch(getInstructorCourses());
        dispatch(loadUser());

        if (userError) {
            dispatch(clearErrors());
            toast.error(userError);
        }
        if (updateError) {
            dispatch(clearErrors());
            toast.error(updateError);
        }

        if (isUpdated) {
            toast.success("Update Successfully.");
            dispatch({ type: UPDATE_PROFILE_RESET });
        }
    }, [dispatch, userError, isUpdated, updateError]);
    return (
        <div className="flex bg-gray-100 min-h-screen">
            {loading ? (
                <>
                    <Loader />
                </>
            ) : (
                <>
                    <div className="mt-20 md:w-3/5 lg:w-3/5 w-full  md:mx-auto lg:mx-auto mx-2 mb-4 bg-white h-min rounded-md">
                        <MetaData title={user?.name} />
                        <div className="flex justify-between items-center px-4 py-2">
                            <h1 className="font-medium text-lg">My Profile</h1>
                            <button
                                onClick={() => setEdit(edit ? false : true)}
                                className="bg-green-500 px-4 py-1 bg-opacity-20 rounded-sm text-green-500 hover:bg-opacity-25"
                            >
                                {edit ? "Profile" : "Edit profile"}
                            </button>
                        </div>
                        <hr />
                        <div className="p-4 grid md:grid-cols-12 lg:grid-cols-12 grid-cols-none gap-4">
                            <div className="md:col-span-4 lg:col-span-4 col-span-12">
                                {user?.picture ? (
                                    <>
                                        <img
                                            className="h-36 w-36 rounded-full object-cover mx-auto my-8"
                                            src={preview}
                                            alt={user?.name}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <div className="bg-gray-500 h-36 w-36 rounded-full flex justify-center items-center text-5xl font-bold my-8 mx-auto">
                                            {user?.name &&
                                                user?.name
                                                    ?.substring(0, 2)
                                                    .toUpperCase()}
                                        </div>
                                    </>
                                )}
                                {edit && (
                                    <>
                                        <div className="flex flex-col gap-2">
                                            <label className="w-3/4 mx-auto bg-blue-700 rounded-full py-2 px-4 text-white text-center mb-4">
                                                {imageLoading ? (
                                                    <ButtonLoader />
                                                ) : (
                                                    <>{uploadButtonText}</>
                                                )}
                                                <input
                                                    type="file"
                                                    name="image"
                                                    onChange={handleImage}
                                                    accept="image/*"
                                                    hidden
                                                />
                                            </label>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="md:col-span-8 lg:col-span-8 col-span-12">
                                <div className="my-8 flex flex-col gap-4">
                                    {/* name  */}
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold">
                                            Full Name
                                        </label>
                                        {edit ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={name}
                                                    name="name"
                                                    onChange={(e) =>
                                                        setName(e.target.value)
                                                    }
                                                    className="py-1 px-4 border-2 outline-none rounded-full"
                                                />
                                            </>
                                        ) : (
                                            <p>{user?.name}</p>
                                        )}
                                    </div>
                                    {/* email  */}
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold">
                                            Email
                                        </label>
                                        <p>{user?.email}</p>
                                    </div>
                                    {/* bio  */}
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold">
                                            Description
                                        </label>
                                        {edit ? (
                                            <>
                                                <textarea
                                                    name="bio"
                                                    rows="5"
                                                    value={bio}
                                                    onChange={(e) =>
                                                        setBio(e.target.value)
                                                    }
                                                    className="py-1 px-4 border-2 outline-none rounded-md"
                                                ></textarea>
                                            </>
                                        ) : (
                                            <p>{user?.bio}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="font-semibold">
                                            Role
                                        </label>
                                        <div className="flex flex-wrap">
                                            {user?.role?.map((item, index) => (
                                                <div
                                                    className="bg-blue-500 mr-4 mt-2 py-1 px-4 rounded-md text-white"
                                                    key={index}
                                                >
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="font-semibold">
                                            Enrolled courses
                                        </label>
                                        <p>{user?.courses?.length}</p>
                                    </div>
                                    {user.role &&
                                        user.role.includes("Instructor") && (
                                            <>
                                                <div>
                                                    <label className="font-semibold">
                                                        Instructor Courses
                                                    </label>
                                                    {courseLoading ? (
                                                        <ButtonLoader />
                                                    ) : (
                                                        <p>{courses?.length}</p>
                                                    )}
                                                </div>
                                            </>
                                        )}

                                    {edit && (
                                        <>
                                            <button
                                                onClick={handleUpdate}
                                                className="bg-purple-500 py-2 px-4 rounded-full mt-4 text-white"
                                            >
                                                {updateLoading ? (
                                                    <ButtonLoader />
                                                ) : (
                                                    "Update Profile"
                                                )}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Profile;
