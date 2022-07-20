import {
    INSTRUCTOR_COURSE_FAIL,
    INSTRUCTOR_COURSE_REQUEST,
    INSTRUCTOR_COURSE_SUCCESS,
} from "../constants/courseConstants";
import {
    CLEAR_ERRORS,
    ENROLLED_STUDENT_FAIL,
    ENROLLED_STUDENT_REQUEST,
    ENROLLED_STUDENT_SUCCESS,
} from "../constants/instructorConstants";

import axios from "axios";

// get course for user
export const getInstructorCourses = () => async (dispatch) => {
    try {
        dispatch({ type: INSTRUCTOR_COURSE_REQUEST });

        const { data } = await axios.get("/api/instructor-courses");

        console.log("Course :", data);

        dispatch({
            type: INSTRUCTOR_COURSE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: INSTRUCTOR_COURSE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// enroll course for free
export const enrolledStudentCount = (courseId) => async (dispatch) => {
    try {
        dispatch({ type: ENROLLED_STUDENT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            `/api/instructor/student-count`,
            { courseId },
            config
        );

        console.log("Enrolled Student :", data);

        dispatch({
            type: ENROLLED_STUDENT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ENROLLED_STUDENT_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
