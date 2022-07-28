import "./App.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { useEffect } from "react";
import store from "./store";
import { loadUser } from "./actions/authActions";
import CourseDetails from "./pages/course/CourseDetails";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Course from "./pages/instructor/Course";
import InstructorCourseDetails from "./pages/instructor/InstructorCourseDetails";
import UpdateCourse from "./pages/instructor/UpdateCourse";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateCourse from "./pages/instructor/CreateCourse";
import UserHome from "./pages/user/UserHome";
import UserCourseDetails from "./pages/user/UserCourseDetails";
import Success from "./pages/stripe/Success";
import Revenue from "./pages/instructor/Revenue";
import BecomeInstructor from "./pages/user/BecomeInstructor";
import Callback from "./pages/stripe/Callback";
import Profile from "./pages/user/Profile";
import NotFound from "./pages/NotFound";

function App() {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Routes>
                    <Route path="/" element={<Home />} exact />
                    <Route path="/search/:keyword" element={<Home />} />
                    <Route path="/login" element={<Login />} exact />
                    <Route path="/signup" element={<Signup />} exact />
                    <Route
                        path="/course/:slug"
                        element={<CourseDetails />}
                        exact
                    />
                    <Route path="*" element={<NotFound />} />

                    {/* Instructor  */}

                    <Route
                        path="/instructor"
                        element={
                            <ProtectedRoute isInstructor={true}>
                                <Course />
                            </ProtectedRoute>
                        }
                        exact
                    />
                    <Route
                        path="/instructor/course/new"
                        element={
                            <ProtectedRoute isInstructor={true}>
                                <CreateCourse />
                            </ProtectedRoute>
                        }
                        exact
                    />
                    <Route
                        path="/instructor/course/:slug"
                        element={
                            <ProtectedRoute isInstructor={true}>
                                <InstructorCourseDetails />
                            </ProtectedRoute>
                        }
                        exact
                    />
                    <Route
                        path="/instructor/course/update/:slug"
                        element={
                            <ProtectedRoute isInstructor={true}>
                                <UpdateCourse />
                            </ProtectedRoute>
                        }
                        exact
                    />
                    <Route
                        path="/instructor/revenue"
                        element={
                            <ProtectedRoute isInstructor={true}>
                                <Revenue />
                            </ProtectedRoute>
                        }
                        exact
                    />

                    {/* user  */}

                    <Route
                        path="/user/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                        exact
                    />
                    <Route
                        path="/user"
                        element={
                            <ProtectedRoute>
                                <UserHome />
                            </ProtectedRoute>
                        }
                        exact
                    />
                    <Route
                        path="/user/course/:slug"
                        element={
                            <ProtectedRoute>
                                <UserCourseDetails />
                            </ProtectedRoute>
                        }
                        exact
                    />
                    <Route
                        path="/user/become-instructor"
                        element={
                            <ProtectedRoute>
                                <BecomeInstructor />
                            </ProtectedRoute>
                        }
                        exact
                    />
                    <Route
                        path="stripe/callback"
                        element={
                            <ProtectedRoute>
                                <Callback />
                            </ProtectedRoute>
                        }
                        exact
                    />
                    {/* stripe  */}
                    <Route
                        path="/stripe/success/:id"
                        element={
                            <ProtectedRoute>
                                <Success />
                            </ProtectedRoute>
                        }
                        exact
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
