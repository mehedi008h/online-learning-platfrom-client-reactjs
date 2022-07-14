import axios from "axios";
import {
    ADD_LESSONE_FAIL,
    ADD_LESSONE_REQUEST,
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
    COURSE_PUBLISH_SUCCESS,
    COURSE_UNPUBLISH_FAIL,
    COURSE_UNPUBLISH_REQUEST,
    COURSE_UNPUBLISH_SUCCESS,
    DELETE_COURSE_FAIL,
    DELETE_COURSE_REQUEST,
    DELETE_COURSE_SUCCESS,
    DELETE_LESSONE_FAIL,
    DELETE_LESSONE_REQUEST,
    DELETE_LESSONE_SUCCESS,
    DELETE_VIDEO_FAIL,
    DELETE_VIDEO_REQUEST,
    DELETE_VIDEO_SUCCESS,
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
    NEW_COURSE_FAIL,
    NEW_COURSE_REQUEST,
    NEW_COURSE_SUCCESS,
    PAID_ENROLLMENT_FAIL,
    PAID_ENROLLMENT_REQUEST,
    PAID_ENROLLMENT_SUCCESS,
    UPDATE_COURSE_FAIL,
    UPDATE_COURSE_REQUEST,
    UPDATE_COURSE_SUCCESS,
    UPDATE_LESSONE_FAIL,
    UPDATE_LESSONE_REQUEST,
    UPDATE_LESSONE_SUCCESS,
    UPLOAD_VIDEO_FAIL,
    UPLOAD_VIDEO_REQUEST,
    UPLOAD_VIDEO_SUCCESS,
    USER_COURSE_FAIL,
    USER_COURSE_REQUEST,
    USER_COURSE_SUCCESS,
} from "../constants/courseConstants";

// get all course
export const getCourses =
    (keyword = "", currentPage = 1) =>
    async (dispatch) => {
        try {
            dispatch({ type: ALL_COURSE_REQUEST });

            const { data } = await axios.get(
                `/api/courses?keyword=${keyword}&page=${currentPage}`
            );

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

// create new produtc by admin
export const newCourse = (courseData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_COURSE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(`/api/course`, courseData, config);

        dispatch({
            type: NEW_COURSE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_COURSE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// create new produtc by admin
export const addLessone =
    (slug, instructorId, lessoneData) => async (dispatch) => {
        try {
            dispatch({ type: ADD_LESSONE_REQUEST });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                `/api/course/lesson/${slug}/${instructorId}`,
                lessoneData,
                config
            );

            console.log("Lessone Data", data);

            dispatch({
                type: ADD_LESSONE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ADD_LESSONE_FAIL,
                payload: error.response.data.message,
            });
        }
    };

// create new produtc by admin
export const publishCourse = (courseId) => async (dispatch) => {
    try {
        dispatch({ type: COURSE_PUBLISH_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(
            `/api/course/publish/${courseId}`,
            config
        );

        console.log("Publish Course", data);

        dispatch({
            type: COURSE_PUBLISH_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: COURSE_PUBLISH_FAIL,
            payload: error.response.data.message,
        });
    }
};

// create new produtc by admin
export const unpublishCourse = (courseId) => async (dispatch) => {
    try {
        dispatch({ type: COURSE_UNPUBLISH_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(
            `/api/course/unpublish/${courseId}`,
            config
        );

        console.log("UNPublish Course", data);

        dispatch({
            type: COURSE_UNPUBLISH_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: COURSE_UNPUBLISH_FAIL,
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

// Update course
export const updateCourse = (slug, courseData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_COURSE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(
            `/api/course/${slug}`,
            courseData,
            config
        );

        dispatch({
            type: UPDATE_COURSE_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_COURSE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete course
export const deleteCourse = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_COURSE_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

        dispatch({
            type: DELETE_COURSE_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_COURSE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Upload video
export const uploadVideo = (instructorId, video) => async (dispatch) => {
    try {
        dispatch({ type: UPLOAD_VIDEO_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            `/api/course/video-upload/${instructorId}`,
            video,
            config
        );

        console.log("Video Data :", data);

        dispatch({
            type: UPLOAD_VIDEO_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPLOAD_VIDEO_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Upload video
export const deleteVideo = (instructorId, video) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_VIDEO_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(
            `/api/course/video-remove/${instructorId}`,
            video,
            config
        );

        console.log("Video Data :", data);

        dispatch({
            type: DELETE_VIDEO_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_VIDEO_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update course
export const updateLessone = (slug, lessonId, lessone) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_LESSONE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(
            `/api/course/lesson/${slug}/${lessonId}`,
            lessone,
            config
        );

        dispatch({
            type: UPDATE_LESSONE_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_LESSONE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete course
export const deleteLessone = (slug, id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_LESSONE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(`/api/course/${slug}/${id}`, config);

        dispatch({
            type: DELETE_LESSONE_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_LESSONE_FAIL,
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
