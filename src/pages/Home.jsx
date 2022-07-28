import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { getCourses } from "../actions/courseActions";
import CourseCard from "../components/cards/CourseCard";
import Loader from "../components/layout/loader/Loader";
import SearchFilter from "../components/cards/SearchFilter";
import MetaData from "../components/layout/MetaData";

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState("");

    const dispatch = useDispatch();
    const {
        loading,
        error,
        courses,
        courseCount,
        resPerPage,
        filteredCourseCount,
    } = useSelector((state) => state.course);

    let { keyword } = useParams();
    useEffect(() => {
        dispatch(getCourses(keyword, currentPage, category));

        if (error) {
            return toast.error(error);
        }
    }, [dispatch, error, keyword, currentPage, category]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }

    let count = courseCount;
    if (keyword) {
        count = filteredCourseCount;
    }
    return (
        <div className=" bg-gray-200 flex min-h-screen">
            {loading ? (
                <>
                    <Loader />
                </>
            ) : (
                <>
                    <div className="md:w-4/5 lg:w-4/5 w-full px-4 md:px-0 lg:px-0 mx-auto mt-20">
                        <MetaData title={"Home"} />
                        <SearchFilter
                            category={category}
                            setCategory={setCategory}
                        />
                        <div className="grid md:grid-cols-12 lg:grid-cols-12 grid-cols-none gap-8">
                            {courses &&
                                courses.map((course) => (
                                    <div
                                        key={course?._id}
                                        className="col-span-4"
                                    >
                                        <CourseCard course={course} />
                                    </div>
                                ))}
                        </div>
                        <div className="my-8">
                            {resPerPage <= count && (
                                <div className="pagination">
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={resPerPage}
                                        totalItemsCount={courseCount}
                                        onChange={setCurrentPageNo}
                                        nextPageText={">"}
                                        prevPageText={"<"}
                                        firstPageText={"<<"}
                                        lastPageText={">>"}
                                        itemClass="page-item"
                                        linkClass="page-link"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
