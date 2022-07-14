import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { paidEnrollment } from "../../actions/courseActions";
import Loader from "../../components/layout/loader/Loader";
import { CLEAR_ERRORS } from "../../constants/courseConstants";

const Success = () => {
    // enroll state
    const { loading, success, error } = useSelector(
        (state) => state.enrollment
    );

    const dispatch = useDispatch();
    let { id } = useParams();

    useEffect(() => {
        dispatch(paidEnrollment(id));

        if (error) {
            toast.error(error);
            dispatch(CLEAR_ERRORS());
        }

        if (success) {
            toast.success("Enroll Success.");
        }
    }, [dispatch, id, success, error]);
    return (
        <div className="flex justify-center items-center mt-20">
            {loading ? (
                <>
                    <Loader />
                </>
            ) : (
                <>
                    <div className="mt-10">
                        <h1 className="text-4xl font-semibold text-center">
                            Thanks for enrolling in this course!
                        </h1>
                        <p className="my-6 text-center">Your order ID : {id}</p>
                        <p className="my-6 text-center">
                            You will receive an email confirmation at{" "}
                            <b>Email</b>
                        </p>
                        <hr />
                        <div className="text-center mt-5">
                            <button className="bg-purple-500 px-6 py-2 rounded-full text-white">
                                Go to course
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Success;
