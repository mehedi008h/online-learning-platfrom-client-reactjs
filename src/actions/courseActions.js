import axios from "axios";
import {
    ALL_COURSE_FAIL,
    ALL_COURSE_REQUEST,
    ALL_COURSE_SUCCESS,
    CHECK_ENROLL_FAIL,
    CHECK_ENROLL_REQUEST,
    CHECK_ENROLL_SUCCESS,
    CLEAR_ERRORS,
    COURSE_DETAILS_FAIL,
    COURSE_DETAILS_REQUEST,
    COURSE_DETAILS_SUCCESS,
    FREE_ENROLLMENT_FAIL,
    FREE_ENROLLMENT_REQUEST,
    FREE_ENROLLMENT_SUCCESS,
    LESSONE_COMPLETE_FAIL,
    LESSONE_COMPLETE_REQUEST,
    LESSONE_COMPLETE_SUCCESS,
    MARK_COMPLETE_FAIL,
    MARK_COMPLETE_REQUEST,
    MARK_COMPLETE_SUCCESS,
    MARK_INCOMPLETE_FAIL,
    MARK_INCOMPLETE_REQUEST,
    MARK_INCOMPLETE_SUCCESS,
    PAID_ENROLLMENT_FAIL,
    PAID_ENROLLMENT_REQUEST,
    PAID_ENROLLMENT_SUCCESS,
    USER_COURSE_FAIL,
    USER_COURSE_REQUEST,
    USER_COURSE_SUCCESS,
} from "../constants/courseConstants";

// get all course
export const getCourses = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_COURSE_REQUEST });

        const { data } = await axios.get("/api/courses");

        console.log("Course :", data);

        dispatch({
            type: ALL_COURSE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_COURSE_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getCourseDetails = (slug) => async (dispatch) => {
    try {
        dispatch({ type: COURSE_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/course/public/${slug}`);

        console.log("Course Details :", data);

        dispatch({
            type: COURSE_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: COURSE_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const checkEnrollment = (slug) => async (dispatch) => {
    try {
        dispatch({ type: CHECK_ENROLL_REQUEST });

        const { data } = await axios.get(`/api/check-enrollment/${slug}`);

        console.log("Check Enroll :", data);

        dispatch({
            type: CHECK_ENROLL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CHECK_ENROLL_FAIL,
            payload: error.response.data.message,
        });
    }
};

// enroll course for free
export const freeEnrollment = (courseId) => async (dispatch) => {
    try {
        dispatch({ type: FREE_ENROLLMENT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            `/api/free-enrollment/${courseId}`,
            config
        );

        console.log("Free Enroll course :", data);

        dispatch({
            type: FREE_ENROLLMENT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: FREE_ENROLLMENT_FAIL,
            payload: error.response.data.message,
        });
    }
};

// enroll course for money
export const paidEnrollment = (id) => async (dispatch) => {
    try {
        dispatch({ type: PAID_ENROLLMENT_REQUEST });

        const { data } = await axios.get(`/api/stripe-success/${id}`);

        console.log("Paid Enroll course :", data);

        dispatch({
            type: PAID_ENROLLMENT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PAID_ENROLLMENT_FAIL,
            payload: error.response.data.message,
        });
    }
};

// get course for user
export const getUserCourses = () => async (dispatch) => {
    try {
        dispatch({ type: USER_COURSE_REQUEST });

        const { data } = await axios.get("/api/user-courses");

        console.log("Course :", data);

        dispatch({
            type: USER_COURSE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_COURSE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// get course for user
export const getCompletedLessone = (courseId) => async (dispatch) => {
    try {
        dispatch({ type: LESSONE_COMPLETE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            `/api/list-completed`,
            {
                courseId,
            },
            config
        );

        console.log("Course :", data);

        dispatch({
            type: LESSONE_COMPLETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: LESSONE_COMPLETE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// get course for user
export const markCompleteLessone = (courseId, lessonId) => async (dispatch) => {
    console.log("COURSE, LESSONE :", courseId, lessonId);
    try {
        dispatch({ type: MARK_COMPLETE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = axios.post(
            `/api/mark-completed`,
            {
                courseId,
                lessonId,
            },
            config
        );

        console.log("Complete :", data);

        dispatch({
            type: MARK_COMPLETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: MARK_COMPLETE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// get course for user
export const markInCompleteLessone =
    (courseId, lessonId) => async (dispatch) => {
        try {
            dispatch({ type: MARK_INCOMPLETE_REQUEST });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = axios.post(
                `/api/mark-incomplete`,
                {
                    courseId,
                    lessonId,
                },
                config
            );

            console.log("Incomplete :", data);

            dispatch({
                type: MARK_INCOMPLETE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: MARK_INCOMPLETE_FAIL,
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
