import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    authReducer,
    userDetailsReducer,
    userReducer,
} from "./reducers/authReducers";
import {
    addLessoneReducer,
    checkEnrollReducer,
    courseActionReducer,
    courseDetailsReducer,
    coursePublishReducer,
    courseReducer,
    enrollmentReducer,
    fileActionReducer,
    lessoneCompleteReducer,
    newCourseReducer,
} from "./reducers/courseReducers";
import {
    instructorCourseReducer,
    studentCountReducer,
} from "./reducers/instructorReducers";

const reducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    userDetails: userDetailsReducer,
    course: courseReducer,
    newCourse: newCourseReducer,
    addLessone: addLessoneReducer,
    fileAction: fileActionReducer,
    courseAction: courseActionReducer,
    coursePublish: coursePublishReducer,
    instructorCourse: instructorCourseReducer,
    courseDetails: courseDetailsReducer,
    checkEnroll: checkEnrollReducer,
    enrollment: enrollmentReducer,
    lessoneComplete: lessoneCompleteReducer,
    studentCount: studentCountReducer,
});

const middlware = [thunk];
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
