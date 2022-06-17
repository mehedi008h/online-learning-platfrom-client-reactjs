import axios from "axios";
import {
    INSTRUCTOR_COURSE_FAIL,
    INSTRUCTOR_COURSE_REQUEST,
    INSTRUCTOR_COURSE_SUCCESS,
} from "../constants/courseConstants";

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
