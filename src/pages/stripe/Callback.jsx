import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config";

const Callback = () => {
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            axiosInstance.post(`/api/get-account-status`).then((res) => {
                // console.log(res);
                window.location.href = "/instructor";
            });
        }
    }, [user]);
    return (
        <div>
            <h1>Callback</h1>
        </div>
    );
};

export default Callback;
