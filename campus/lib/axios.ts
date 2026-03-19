import axios from 'axios';

const baseURL_env = (process.env.AXIOS_BASE_URL) ? process.env.AXIOS_BASE_URL : 'http://localhost:8000';

console.log(baseURL_env)

const api = axios.create({
    baseURL: baseURL_env,
    withCredentials: true,
    withXSRFToken: true,
    xsrfHeaderName: "X-XSRF-TOKEN"
});

export default api;