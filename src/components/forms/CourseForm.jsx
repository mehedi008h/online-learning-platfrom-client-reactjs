import React from "react";

const CourseForm = ({
    handleSubmit,
    handleImage,
    handleChange,
    values,
    setValues,
    preview,
    uploadButtonText,
    handleImageRemove,
    editPage = false,
}) => {
    const children = [];
    for (let i = 9.99; i <= 100.99; i++) {
        children.push(<option key={i.toFixed(2)}>${i.toFixed(2)}</option>);
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
                        defaultValue={values.paid}
                        onChange={(v) =>
                            setValues({ ...values, paid: v, price: 0 })
                        }
                    >
                        <option value={true}>Paid</option>
                        <option value={false}>Free</option>
                    </select>
                </div>
                {values.paid && (
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
                            onChange={(v) => setValues({ ...values, price: v })}
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
                    <div
                        count="X"
                        onClick={handleImageRemove}
                        className="pointer"
                    >
                        <img width={200} src={preview} alt="" />
                    </div>
                )}
                <button
                    onClick={handleSubmit}
                    disabled={values.loading || values.uploading}
                    className="py-2 px-4 rounded-full bg-green-500 md:w-2/4 w-3/4 mx-auto"
                    loading={values.loading}
                >
                    {values.loading ? "Saving..." : "Save & Continue"}
                </button>
            </form>
        </div>
    );
};

export default CourseForm;
