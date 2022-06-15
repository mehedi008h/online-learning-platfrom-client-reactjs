import axios from "axios";
import {
    ALL_COURSE_FAIL,
    ALL_COURSE_REQUEST,
    ALL_COURSE_SUCCESS,
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
