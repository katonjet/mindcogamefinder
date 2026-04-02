import axios from 'axios';

export const serverURL = (process.env.NEXT_PUBLIC_AXIOS_BASE_URL) ? process.env.NEXT_PUBLIC_AXIOS_BASE_URL : '';

console.log(serverURL)

const api = axios.create({
    baseURL: serverURL,
    withCredentials: true,
    withXSRFToken: true,
    xsrfHeaderName: "X-XSRF-TOKEN"
});

export default api;