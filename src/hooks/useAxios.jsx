import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://asg-12-server.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;