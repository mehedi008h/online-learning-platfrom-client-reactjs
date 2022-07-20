import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { axiosInstance } from "../../config";

const BecomeInstructor = () => {
    // state
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.auth);

    const becomeInstructor = () => {
        // console.log("become instructor");
        setLoading(true);
        axios
            .post("/api/make-instructor")
            .then((res) => {
                console.log(res);
                window.location.href = res.data;
            })
            .catch((err) => {
                console.log(err.response.status);
                toast("Stripe onboarding failed. Try again.");
                setLoading(false);
            });
    };
    return (
        <div className="mt-20">
            <h1 className="jumbotron text-center square">Become Instructor</h1>

            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 text-center">
                        <div className="pt-4">
                            {/* <UserSwitchOutlined className="display-1 pb-3" /> */}
                            <br />
                            <h2>Setup payout to publish courses on Edemy</h2>
                            <p className="lead text-warning">
                                Edemy partners with stripe to transfer earnings
                                to your bank account
                            </p>

                            <button
                                className="mb-3 mt-4 bg-blue-500 px-6 py-2 rounded-full text-white"
                                onClick={becomeInstructor}
                                disabled={
                                    (user?.user &&
                                        user?.user?.role &&
                                        user?.user?.role.includes(
                                            "Instructor"
                                        )) ||
                                    loading
                                }
                            >
                                {loading ? "Processing..." : "Payout Setup"}
                            </button>

                            <p className="lead">
                                You will be redirected to stripe to complete
                                onboarding process.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BecomeInstructor;
