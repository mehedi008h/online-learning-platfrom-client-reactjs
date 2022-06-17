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

function App() {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
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
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
