import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://e-learn-platfrom.herokuapp.com",
});
