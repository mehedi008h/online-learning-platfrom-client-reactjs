import React from "react";
import ReactPlayer from "react-player";
import { IoIosClose } from "react-icons/io";

const PreviewModal = ({ setOpen, preview }) => {
    return (
        <div
            className="bg-white p-2 rounded-md relative"
            style={{ width: "750px" }}
        >
            <button
                onClick={() => setOpen(false)}
                className="bg-red-600 p-1 rounded-full flex justify-center items-center text-white absolute top-0 right-0"
            >
                <IoIosClose size={20} />
            </button>
            <div className="mt-6">
                <ReactPlayer
                    url={preview}
                    controls={true}
                    width="100%"
                    height="100%"
                />
            </div>
        </div>
    );
};

export default PreviewModal;
