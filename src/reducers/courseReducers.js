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
    MARK_COMPLETE_RESET,
    MARK_COMPLETE_SUCCESS,
    MARK_INCOMPLETE_FAIL,
    MARK_INCOMPLETE_REQUEST,
    MARK_INCOMPLETE_RESET,
    MARK_INCOMPLETE_SUCCESS,
    PAID_ENROLLMENT_FAIL,
    PAID_ENROLLMENT_REQUEST,
    PAID_ENROLLMENT_SUCCESS,
    USER_COURSE_FAIL,
    USER_COURSE_REQUEST,
    USER_COURSE_SUCCESS,
} from "../constants/courseConstants";

export const courseReducer = (state = { courses: [] }, action) => {
    switch (action.type) {
        case ALL_COURSE_REQUEST:
        case USER_COURSE_REQUEST:
            return {
                loading: true,
                courses: [],
            };

        case ALL_COURSE_SUCCESS:
        case USER_COURSE_SUCCESS:
            return {
                loading: false,
                courses: action.payload,
            };

        case ALL_COURSE_FAIL:
        case USER_COURSE_FAIL:
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

export const courseDetailsReducer = (state = { course: {} }, action) => {
    switch (action.type) {
        case COURSE_DETAILS_REQUEST:
        case CHECK_ENROLL_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case COURSE_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                course: action.payload,
            };

        case CHECK_ENROLL_SUCCESS:
            return {
                ...state,
                loading: false,
                course: action.payload.course,
                status: action.payload.status,
            };

        case COURSE_DETAILS_FAIL:
        case CHECK_ENROLL_FAIL:
            return {
                ...state,
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

export const enrollmentReducer = (state = {}, action) => {
    switch (action.type) {
        case FREE_ENROLLMENT_REQUEST:
        case PAID_ENROLLMENT_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case FREE_ENROLLMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                course: action.payload.course,
                success: action.payload.success,
            };

        case PAID_ENROLLMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                course: action.payload.course,
                success: action.payload.success,
            };

        case FREE_ENROLLMENT_FAIL:
        case PAID_ENROLLMENT_FAIL:
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

export const lessoneCompleteReducer = (
    state = { completedLessone: [] },
    action
) => {
    switch (action.type) {
        case LESSONE_COMPLETE_REQUEST:
        case MARK_COMPLETE_REQUEST:
        case MARK_INCOMPLETE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case LESSONE_COMPLETE_SUCCESS:
            return {
                ...state,
                loading: false,
                completedLessone: action.payload,
            };

        case MARK_COMPLETE_SUCCESS:
            return {
                ...state,
                loading: false,
                complete: action.payload,
            };

        case MARK_INCOMPLETE_SUCCESS:
            return {
                ...state,
                loading: false,
                inComplete: action.payload,
            };

        case LESSONE_COMPLETE_FAIL:
        case MARK_COMPLETE_FAIL:
        case MARK_INCOMPLETE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case MARK_COMPLETE_RESET:
            return {
                ...state,
                complete: false,
            };

        case MARK_INCOMPLETE_RESET:
            return {
                ...state,
                inComplete: false,
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
