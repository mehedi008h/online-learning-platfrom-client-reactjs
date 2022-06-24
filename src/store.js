import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./reducers/authReducers";
import {
    addLessoneReducer,
    courseDetailsReducer,
    coursePublishReducer,
    courseReducer,
    enrollmentReducer,
    lessoneCompleteReducer,
    newCourseReducer,
} from "./reducers/courseReducers";
import { instructorCourseReducer } from "./reducers/instructorReducers";

const reducer = combineReducers({
    auth: authReducer,
    course: courseReducer,
    newCourse: newCourseReducer,
    addLessone: addLessoneReducer,
    coursePublish: coursePublishReducer,
    instructorCourse: instructorCourseReducer,
    courseDetails: courseDetailsReducer,
    enrollment: enrollmentReducer,
    lessoneComplete: lessoneCompleteReducer,
});

const middlware = [thunk];
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
