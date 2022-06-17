import {
    CLEAR_ERRORS,
    INSTRUCTOR_COURSE_FAIL,
    INSTRUCTOR_COURSE_REQUEST,
    INSTRUCTOR_COURSE_SUCCESS,
} from "../constants/courseConstants";

export const instructorCourseReducer = (state = { courses: [] }, action) => {
    switch (action.type) {
        case INSTRUCTOR_COURSE_REQUEST:
            return {
                loading: true,
                courses: [],
            };

        case INSTRUCTOR_COURSE_SUCCESS:
            return {
                loading: false,
                courses: action.payload,
            };

        case INSTRUCTOR_COURSE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};
