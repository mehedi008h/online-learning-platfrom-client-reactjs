import axios from "axios";
import React, { useEffect, useState } from "react";
import { stripeCurrencyFormatter } from "../../utils/helper";

const Revenue = () => {
    const [balance, setBalance] = useState({ pending: [] });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        sendBalanceRequest();
    }, []);

    const sendBalanceRequest = async () => {
        const { data } = await axios.get(`/api/instructor/balance`);
        setBalance(data);
    };

    const handlePayoutSettings = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/instructor/payout-settings`);
            window.location.href = data;
        } catch (err) {
            setLoading(false);
            console.log(err);
            alert("Unable to access payout settings. Try later.");
        }
    };
    return (
        <div className="mt-20">
            <div className="w-4/5 mx-auto">
                <div className="container font-poppins">
                    <div className="pt-2">
                        <div className="p-5">
                            <h2 className="font-bold text-lg">
                                Revenue report{" "}
                                {/* <DollarOutlined className="float-right" />{" "} */}
                            </h2>
                            <p className="font-base text-gray-500">
                                You get paid directly from stripe to your bank
                                account every 48 hour
                            </p>
                            <hr className="my-2" />

                            <h2 className="font-bold text-lg">
                                Pending balance
                                {balance.pending &&
                                    balance.pending.map((bp, i) => (
                                        <span key={i} className="float-right">
                                            {stripeCurrencyFormatter(bp)}
                                        </span>
                                    ))}
                            </h2>
                            <p className="font-base text-gray-500">
                                For last 48 hours
                            </p>
                            <hr className="my-2" />
                            <h2 className="font-bold text-lg">
                                Payouts{" "}
                                {/* {!loading ? (
                                    <SettingOutlined
                                        className="float-right pointer"
                                        onClick={handlePayoutSettings}
                                    />
                                ) : (
                                    <SyncOutlined
                                        spin
                                        className="float-right pointer"
                                    />
                                )} */}
                            </h2>
                            <p className="font-base text-gray-500">
                                Update your stripe account details or view
                                previous payouts.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Revenue;
