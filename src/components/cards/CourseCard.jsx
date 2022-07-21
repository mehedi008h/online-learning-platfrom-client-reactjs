import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, getUserDetails } from "../../actions/authActions";
import ButtonLoader from "../layout/buttonLoader/ButtonLoader";

const CourseCard = ({ course }) => {
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
        <Link to={`/course/${course?.slug}`}>
            <div className="p-2 bg-white rounded-md card">
                <div>
                    <img
                        src={course?.image?.Location}
                        className="w-full h-44 object-cover rounded-md"
                        alt={course?.name}
                    />
                </div>
                <div className="mt-4 px-4 py-2">
                    <h1 className="font-medium text-lg h-12 overflow-hidden">
                        {course?.name}
                    </h1>
                    <p className="h-24 mt-4 overflow-hidden text-gray-500 text-base">
                        {course?.description}
                    </p>
                    <div className="flex justify-between items-center mt-4 h-10">
                        {loading ? (
                            <>
                                <ButtonLoader />
                            </>
                        ) : (
                            <>
                                <div className="flex justify-center items-center gap-3">
                                    <img
                                        src={user?.picture?.Location}
                                        className="h-8 w-8 rounded-full object-cover"
                                        alt={user?.name}
                                    />
                                    <p className="font-base text-gray-600">
                                        {user?.name}
                                    </p>
                                </div>
                            </>
                        )}

                        <p className="text-pink-500 font-bold">
                            {course?.paid ? `$ ${course?.price}` : "Free"}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;
