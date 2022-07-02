import {
    CLEAR_ERRORS,
    INSTRUCTOR_COURSE_FAIL,
    INSTRUCTOR_COURSE_REQUEST,
    INSTRUCTOR_COURSE_SUCCESS,
} from "../constants/courseConstants";
import {
    ENROLLED_STUDENT_FAIL,
    ENROLLED_STUDENT_REQUEST,
    ENROLLED_STUDENT_SUCCESS,
} from "../constants/instructorConstants";

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

export const studentCountReducer = (state = { students: [] }, action) => {
    switch (action.type) {
        case ENROLLED_STUDENT_REQUEST:
            return {
                loading: true,
                students: [],
            };

        case ENROLLED_STUDENT_SUCCESS:
            return {
                loading: false,
                students: action.payload,
            };

        case ENROLLED_STUDENT_FAIL:
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
