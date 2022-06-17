import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./reducers/authReducers";
import { courseDetailsReducer, courseReducer } from "./reducers/courseReducers";
import { instructorCourseReducer } from "./reducers/instructorReducers";

const reducer = combineReducers({
    auth: authReducer,
    course: courseReducer,
    instructorCourse: instructorCourseReducer,
    courseDetails: courseDetailsReducer,
});

const middlware = [thunk];
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
