import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
    clearErrors,
    getInstructorCourses,
} from "../../actions/instructorActions";
import ButtonLoader from "../../components/layout/buttonLoader/ButtonLoader";
import Loader from "../../components/layout/loader/Loader";

const Profile = () => {
    const {
        loading,
        user,
        error: userError,
    } = useSelector((state) => state.auth);
    const {
        loading: courseLoading,
        error,
        courses,
    } = useSelector((state) => state.instructorCourse);

    const dispatch = useDispatch();
    // console.log("Instrocur", courses);

    useEffect(() => {
        dispatch(getInstructorCourses());

        if (error) {
            dispatch(clearErrors());
            toast.error(error);
        }
        if (userError) {
            dispatch(clearErrors());
            toast.error(error);
        }
    }, [dispatch, error, userError]);
    return (
        <div className="flex bg-gray-100 min-h-screen">
            {loading ? (
                <>
                    <Loader />
                </>
            ) : (
                <>
                    <div className="mt-20 md:w-3/5 lg:w-3/5 w-full  md:mx-auto lg:mx-auto mx-2 mb-4 bg-white h-min rounded-md">
                        <div className="flex justify-between items-center px-4 py-2">
                            <h1 className="font-medium text-lg">My Profile</h1>
                            <Link
                                className="bg-green-500 px-4 py-1 bg-opacity-20 rounded-sm text-green-500 hover:bg-opacity-25"
                                to="/user/profile/update"
                            >
                                Edit profile
                            </Link>
                        </div>
                        <hr />
                        <div className="p-4 grid md:grid-cols-12 lg:grid-cols-12 grid-cols-none gap-4">
                            <div className="md:col-span-4 lg:col-span-4 col-span-12">
                                {user?.picture ? (
                                    <>
                                        {/* <img src={user?.picture} alt={user?.name} /> */}
                                        <div className="bg-gray-500 h-36 w-36 rounded-full flex justify-center items-center text-5xl font-bold my-8 mx-auto">
                                            {user?.name &&
                                                user?.name
                                                    ?.substring(0, 2)
                                                    .toUpperCase()}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            {user?.name &&
                                                user?.name?.substring(1, 3)}
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="md:col-span-8 lg:col-span-8 col-span-12">
                                <div className="my-8 flex flex-col gap-4">
                                    <div>
                                        <label className="font-semibold">
                                            Full Name
                                        </label>
                                        <p>{user?.name}</p>
                                    </div>
                                    <div>
                                        <label className="font-semibold">
                                            Email
                                        </label>
                                        <p>{user?.email}</p>
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
