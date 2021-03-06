import React from "react";
import { IoIosClose } from "react-icons/io";
import ButtonLoader from "../layout/buttonLoader/ButtonLoader";

const AddLessoneModal = ({
    setVisible,
    values,
    setValues,
    handleAddLesson,
    uploading,
    uploadButtonText,
    handleVideo,
    progress,
    handleVideoRemove,
    lessoneLoading,
}) => {
    return (
        <div
            className="bg-white p-2 rounded-md border-2 relative"
            style={{ width: "750px" }}
        >
            <button
                onClick={() => setVisible(false)}
                className="bg-red-600 p-1 rounded-full flex justify-center items-center text-white absolute top-0 right-0"
            >
                <IoIosClose size={20} />
            </button>
            <div className="p-4">
                <h1>Add lessone</h1>
                <div className="p-4">
                    <form
                        onSubmit={handleAddLesson}
                        className="flex flex-col gap-4"
                    >
                        {/* lessone title  */}
                        <div className="flex flex-col gap-2">
                            <label
                                className="text-base font-semibold"
                                htmlFor="name_Firld"
                            >
                                Lessone Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                values={values.title}
                                onChange={(e) =>
                                    setValues({
                                        ...values,
                                        title: e.target.value,
                                    })
                                }
                                className="border-b-2 border-gray-500 bg-transparent outline-none py-2 px-4 focus:border-green-500"
                            />
                        </div>

                        {/* lessone content  */}
                        <div className="flex flex-col gap-2">
                            <label
                                className="text-base font-semibold"
                                htmlFor="name_Firld"
                            >
                                Lessone Content
                            </label>
                            <textarea
                                name="content"
                                onChange={(e) =>
                                    setValues({
                                        ...values,
                                        content: e.target.value,
                                    })
                                }
                                values={values.content}
                                className="border-b-2 border-gray-500 outline-none py-2 px-4 focus:border-green-500"
                                rows="3"
                            ></textarea>
                        </div>
                        {/* lessone video  */}
                        <div className="flex justify-center mt-2">
                            <label className="bg-yellow-500 text-white py-2 w-full rounded-full text-center">
                                {uploading ? (
                                    <>
                                        <ButtonLoader />{" "}
                                    </>
                                ) : (
                                    `${uploadButtonText}`
                                )}
                                <input
                                    onChange={handleVideo}
                                    type="file"
                                    accept="video/*"
                                    hidden
                                />
                            </label>
                        </div>

                        <div
                            style={{ width: `${progress}%` }}
                            className="h-1 bg-black rounded-full"
                        ></div>

                        <div className="mt-4 w-2/4 mx-auto">
                            <button
                                onClick={handleAddLesson}
                                loading={uploading}
                                className="bg-green-500 w-full py-2 px-4 rounded-full text-white"
                            >
                                {lessoneLoading ? (
                                    <ButtonLoader />
                                ) : (
                                    "Upload Lessone"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddLessoneModal;
