import {
    ADD_LESSONE_FAIL,
    ADD_LESSONE_REQUEST,
    ADD_LESSONE_RESET,
    ADD_LESSONE_SUCCESS,
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
    COURSE_PUBLISH_FAIL,
    COURSE_PUBLISH_REQUEST,
    COURSE_PUBLISH_RESET,
    COURSE_PUBLISH_SUCCESS,
    COURSE_UNPUBLISH_FAIL,
    COURSE_UNPUBLISH_REQUEST,
    COURSE_UNPUBLISH_SUCCESS,
    DELETE_COURSE_FAIL,
    DELETE_COURSE_REQUEST,
    DELETE_COURSE_RESET,
    DELETE_COURSE_SUCCESS,
    DELETE_LESSONE_FAIL,
    DELETE_LESSONE_REQUEST,
    DELETE_LESSONE_RESET,
    DELETE_LESSONE_SUCCESS,
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
    NEW_COURSE_FAIL,
    NEW_COURSE_REQUEST,
    NEW_COURSE_RESET,
    NEW_COURSE_SUCCESS,
    PAID_ENROLLMENT_FAIL,
    PAID_ENROLLMENT_REQUEST,
    PAID_ENROLLMENT_SUCCESS,
    UPDATE_COURSE_FAIL,
    UPDATE_COURSE_REQUEST,
    UPDATE_COURSE_RESET,
    UPDATE_COURSE_SUCCESS,
    UPDATE_LESSONE_FAIL,
    UPDATE_LESSONE_REQUEST,
    UPDATE_LESSONE_RESET,
    UPDATE_LESSONE_SUCCESS,
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

export const newCourseReducer = (state = { course: {} }, action) => {
    switch (action.type) {
        case NEW_COURSE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case NEW_COURSE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                course: action.payload.course,
            };

        case NEW_COURSE_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case NEW_COURSE_RESET:
            return {
                ...state,
                success: false,
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

export const addLessoneReducer = (state = { lessone: {} }, action) => {
    switch (action.type) {
        case ADD_LESSONE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ADD_LESSONE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                lessone: action.payload.upload,
            };

        case ADD_LESSONE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case ADD_LESSONE_RESET:
            return {
                ...state,
                success: false,
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

// course & lessone update & delete reducers

export const courseActionReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_COURSE_REQUEST:
        case UPDATE_COURSE_REQUEST:
        case DELETE_LESSONE_REQUEST:
        case UPDATE_LESSONE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case DELETE_COURSE_SUCCESS:
        case DELETE_LESSONE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };

        case UPDATE_COURSE_SUCCESS:
        case UPDATE_LESSONE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };

        case DELETE_COURSE_FAIL:
        case UPDATE_COURSE_FAIL:
        case DELETE_LESSONE_FAIL:
        case UPDATE_LESSONE_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case DELETE_COURSE_RESET:
        case DELETE_LESSONE_RESET:
            return {
                ...state,
                isDeleted: false,
            };

        case UPDATE_COURSE_RESET:
        case UPDATE_LESSONE_RESET:
            return {
                ...state,
                isUpdated: false,
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

export const coursePublishReducer = (state = { course: {} }, action) => {
    switch (action.type) {
        case COURSE_PUBLISH_REQUEST:
        case COURSE_UNPUBLISH_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case COURSE_PUBLISH_SUCCESS:
        case COURSE_UNPUBLISH_SUCCESS:
            return {
                ...state,
                loading: false,
                course: action.payload.update,
                message: action.payload.message,
            };

        case COURSE_PUBLISH_FAIL:
        case COURSE_UNPUBLISH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case COURSE_PUBLISH_RESET:
            return {
                ...state,
                message: null,
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
