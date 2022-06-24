import React from "react";
import ButtonLoader from "../layout/buttonLoader/ButtonLoader";

const CourseForm = ({
    handleSubmit,
    handleImage,
    handleChange,
    values,
    preview,
    uploadButtonText,
    handleImageRemove,
    editPage = false,
}) => {
    console.log(values);
    const children = [];
    for (let i = 9.99; i <= 100.99; i++) {
        children.push(<option key={i.toFixed(2)}>{i.toFixed(2)}</option>);
    }
    return (
        <div>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                {/* course name  */}
                <div className="flex flex-col gap-2">
                    <label
                        className="text-base font-semibold"
                        htmlFor="name_Firld"
                    >
                        Course Name
                    </label>
                    <input
                        type="text"
                        placeholder="Name"
                        value={values.name}
                        onChange={handleChange}
                        name="name"
                        className="border-b-2 border-gray-500 bg-transparent outline-none py-2 px-4 focus:border-green-500"
                    />
                </div>

                {/* course description  */}
                <div className="flex flex-col gap-2">
                    <label
                        className="text-base font-semibold"
                        htmlFor="name_Firld"
                    >
                        Course Description
                    </label>
                    <textarea
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        className="border-b-2 border-gray-500 outline-none py-2 px-4 focus:border-green-500"
                        rows="5"
                    ></textarea>
                </div>

                {/* course price  */}
                <div className="flex flex-col gap-2">
                    <label
                        className="text-base font-semibold"
                        htmlFor="name_Firld"
                    >
                        Course Price
                    </label>
                    <select
                        className="border-b-2 border-gray-500 bg-transparent outline-none py-2 px-4 focus:border-green-500"
                        value={values?.paid}
                        name="paid"
                        onChange={handleChange}
                    >
                        <option value={true}>Paid</option>
                        <option value={false}>Free</option>
                    </select>
                </div>
                {values && values?.paid && (
                    <div className="flex flex-col gap-2">
                        <label
                            className="text-base font-semibold"
                            htmlFor="name_Firld"
                        >
                            Course Price
                        </label>
                        <select
                            className="border-b-2 border-gray-500 bg-transparent outline-none py-2 px-4 focus:border-green-500"
                            value={values.price}
                            name="price"
                            onChange={handleChange}
                        >
                            {children}
                        </select>
                    </div>
                )}

                {/* course category  */}
                <div className="flex flex-col gap-2">
                    <label
                        className="text-base font-semibold"
                        htmlFor="name_Firld"
                    >
                        Course Category
                    </label>
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={values.category}
                        onChange={handleChange}
                        className="border-b-2 border-gray-500 bg-transparent outline-none py-2 px-4 focus:border-green-500"
                    />
                </div>

                {/* course image  */}
                <div className="flex flex-col gap-2">
                    <label className="w-full bg-blue-700 rounded-full py-2 px-4 text-white text-center mb-4">
                        {uploadButtonText}
                        <input
                            type="file"
                            name="image"
                            onChange={handleImage}
                            accept="image/*"
                            hidden
                        />
                    </label>
                </div>
                {preview && (
                    <div className="relative ">
                        <img width={200} src={preview} alt="" />
                        <button
                            className="absolute top-1 left-1 bg-white flex items-center justify-center rounded-full h-6 w-6 text-red-500"
                            onClick={handleImageRemove}
                        >
                            X
                        </button>
                    </div>
                )}
                <button
                    onClick={handleSubmit}
                    disabled={values.loading || values.uploading}
                    className="py-2 px-4 rounded-full bg-green-500 md:w-2/4 w-3/4 mx-auto"
                    loading={values.loading}
                >
                    {values.loading ? <ButtonLoader /> : "Save & Continue"}
                </button>
            </form>
        </div>
    );
};

export default CourseForm;
