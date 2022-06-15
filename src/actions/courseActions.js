import axios from "axios";
import {
    ALL_COURSE_FAIL,
    ALL_COURSE_REQUEST,
    ALL_COURSE_SUCCESS,
    CLEAR_ERRORS,
    COURSE_DETAILS_FAIL,
    COURSE_DETAILS_REQUEST,
    COURSE_DETAILS_SUCCESS,
} from "../constants/courseConstants";

// get product for user
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

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
