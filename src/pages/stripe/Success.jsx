import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { paidEnrollment } from "../../actions/courseActions";
import { CLEAR_ERRORS } from "../../constants/courseConstants";

const Success = () => {
    // enroll state
    const { course, success, error } = useSelector((state) => state.enrollment);

    console.log("PAid course :", course);

    const dispatch = useDispatch();
    let { id } = useParams();

    useEffect(() => {
        dispatch(paidEnrollment(id));

        if (error) {
            console.log(error);
            dispatch(CLEAR_ERRORS());
        }

        if (success) {
            toast.success("Enroll Success.");
        }
    }, [dispatch, id, success, error]);
    return (
        <div className="mt-20">
            <h1>Success</h1>
            <p>{id}</p>
        </div>
    );
};

export default Success;
