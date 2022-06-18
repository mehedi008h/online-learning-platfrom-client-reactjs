import React from "react";
import { IoIosClose } from "react-icons/io";
import ReactPlayer from "react-player";

const EditLessoneModal = ({
    lessone,
    setOpenLessone,
    setlessone,
    handleUpdateLesson,
}) => {
    return (
        <div
            className="bg-white p-2 rounded-md border-2 relative"
            style={{ width: "750px" }}
        >
            <button
                onClick={() => setOpenLessone(false)}
                className="bg-red-600 p-1 rounded-full flex justify-center items-center text-white absolute top-0 right-0"
            >
                <IoIosClose size={20} />
            </button>
            <div className="p-4">
                <h1>
                    Update lessone <b>{lessone?.title}</b>
                </h1>
                <div className="p-4">
                    <form
                        onSubmit={handleUpdateLesson}
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
                                value={lessone?.title}
                                onChange={(e) =>
                                    setlessone({
                                        ...lessone,
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
                                value={lessone?.content}
                                onChange={(e) =>
                                    setlessone({
                                        ...lessone,
                                        content: e.target.value,
                                    })
                                }
                                className="border-b-2 border-gray-500 outline-none py-2 px-4 focus:border-green-500"
                                rows="3"
                            ></textarea>
                        </div>
                        {/* lessone video  */}
                        <div className="flex flex-row gap-2">
                            <div>
                                <ReactPlayer
                                    url={lessone?.video?.Location}
                                    width="410px"
                                    height="240px"
                                    controls
                                />
                            </div>
                            <div className="flex flex-col w-full gap-4 p-4">
                                <div>
                                    <label className="bg-blue-500 text-white text-center rounded-full py-2 w-full px-4">
                                        Upload Video
                                        <input
                                            type="file"
                                            accept="video/*"
                                            hidden
                                        />
                                    </label>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="pt-3 badge">
                                        Free Preview
                                    </span>
                                    <input
                                        type="checkbox"
                                        checked={lessone?.free_preview}
                                        onChange={(e) =>
                                            setlessone({
                                                ...lessone,
                                                free_preview: e.target.value,
                                            })
                                        }
                                        className="float-right mt-2"
                                        name="free_preview"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 mx-auto">
                            <button
                                onClick={handleUpdateLesson}
                                className="bg-green-500 py-2 px-4 rounded-full text-white"
                            >
                                Update Lessone
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditLessoneModal;
