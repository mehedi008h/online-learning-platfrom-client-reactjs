import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, getUserDetails } from "../../actions/authActions";
import ButtonLoader from "../layout/buttonLoader/ButtonLoader";

const Instructor = ({ course }) => {
    const dispatch = useDispatch();

    // instructor details state
    const { loading, error, user } = useSelector((state) => state.userDetails);

    useEffect(() => {
        if (user && user._id !== course?.instructor) {
            dispatch(getUserDetails(course?.instructor));
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, user, course?.instructor, error]);
    return (
        <div>
            <div className="md:w-3/5 lg:w-3/5 w-full md:px-0 lg:px-0 px-6 mx-auto py-6">
                <h1 className="font-semibold text-xl">Your Instructor</h1>
                <div className="grid md:grid-cols-12 grid-cols-none gap-2 my-6">
                    {loading ? (
                        <>
                            <ButtonLoader />
                        </>
                    ) : (
                        <>
                            <div className="md:col-span-2 lg:col-span-2 col-span-12 ">
                                <img
                                    className="h-28 w-28 rounded-full object-cover border-4 border-gray-300 float-left"
                                    src={user?.picture?.Location}
                                    alt={user?.name}
                                />
                            </div>
                            <div className="px-4 md:col-span-10 lg:col-span-10  col-span-12">
                                <h3 className="font-bold text-xl">
                                    {user?.name}
                                </h3>
                                <p className="text-base text-gray-600 my-2 tracking-wide">
                                    {user?.bio}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Instructor;
