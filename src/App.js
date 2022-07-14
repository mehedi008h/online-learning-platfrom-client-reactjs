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
                    <Route path="/" element={<Home />} />
                    <Route path="/search/:keyword" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/course/:slug" element={<CourseDetails />} />

                    {/* Instructor  */}

                    <Route
                        path="/instructor"
                        element={
                            <ProtectedRoute isInstructor={true}>
                                <Course />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/instructor/course/new"
                        element={
                            <ProtectedRoute isInstructor={true}>
                                <CreateCourse />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/instructor/course/:slug"
                        element={
                            <ProtectedRoute isInstructor={true}>
                                <InstructorCourseDetails />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/instructor/course/update/:slug"
                        element={
                            <ProtectedRoute isInstructor={true}>
                                <UpdateCourse />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/instructor/revenue"
                        element={
                            <ProtectedRoute isInstructor={true}>
                                <Revenue />
                            </ProtectedRoute>
                        }
                    />

                    {/* user  */}

                    <Route
                        path="/user/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/user"
                        element={
                            <ProtectedRoute>
                                <UserHome />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/user/course/:slug"
                        element={
                            <ProtectedRoute>
                                <UserCourseDetails />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/user/become-instructor"
                        element={
                            <ProtectedRoute>
                                <BecomeInstructor />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="stripe/callback"
                        element={
                            <ProtectedRoute>
                                <Callback />
                            </ProtectedRoute>
                        }
                    />
                    {/* stripe  */}
                    <Route
                        path="/stripe/success/:id"
                        element={
                            <ProtectedRoute>
                                <Success />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
