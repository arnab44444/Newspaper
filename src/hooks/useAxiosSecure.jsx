import axios from 'axios';
import { use } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000'
});

const useAxiosSecure = () => {
        const {  logOut } = use(AuthContext);

  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(config => {
    const token = localStorage.getItem('access-token');
    console.log('token inside axios secure', token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

  axiosSecure.interceptors.response.use(res => res, error => {
    const status = error.response?.status;
    if (status === 403 ){
        navigate('/forbidden');
    } 
   else if (status === 401) {
            logOut()
                .then(() => {
                    navigate('/login')
                })
                .catch(() => { })
        }

        return Promise.reject(error);
    })
      return axiosSecure;
};

export default useAxiosSecure;
