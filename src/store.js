import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./reducers/authReducers";
import {
    addLessoneReducer,
    courseActionReducer,
    courseDetailsReducer,
    coursePublishReducer,
    courseReducer,
    enrollmentReducer,
    lessoneCompleteReducer,
    newCourseReducer,
} from "./reducers/courseReducers";
import {
    instructorCourseReducer,
    studentCountReducer,
} from "./reducers/instructorReducers";

const reducer = combineReducers({
    auth: authReducer,
    course: courseReducer,
    newCourse: newCourseReducer,
    addLessone: addLessoneReducer,
    courseAction: courseActionReducer,
    coursePublish: coursePublishReducer,
    instructorCourse: instructorCourseReducer,
    courseDetails: courseDetailsReducer,
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
