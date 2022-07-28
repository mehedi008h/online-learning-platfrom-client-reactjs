import { axiosInstance } from "../config";
import {
    CLEAR_ERRORS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
} from "../constants/authConstants";

// Register user
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axiosInstance.post(
            "/api/register",
            userData,
            config
        );

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axiosInstance.post(
            "/api/login",
            { email, password },
            config
        );

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axiosInstance.get("/api/current-user");

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Logout user
export const logout = () => async (dispatch) => {
    try {
        await axiosInstance.get("/api/logout");

        dispatch({
            type: LOGOUT_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update profile
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axiosInstance.put(
            "/api/current-user/update",
            userData,
            config
        );

        console.log("Update Data :", data);

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get user details
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });

        const { data } = await axiosInstance.get(`/api/user/${id}`);

        console.log("Data 33", data);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
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
