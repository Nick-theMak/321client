import axios from "axios";
import { url } from "./url"; // Import the base URL for the API

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
    baseURL: url,
});

// Interceptor to add authorization token to each request if available
axiosInstance.interceptors.request.use(
    (config) => {
        // Retrieve the token from local storage
        const token = localStorage.getItem("token");
        if (token) {
            // If token is available, add it to the request headers
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config; // Return the config object with updated headers
    },
    (error) => Promise.reject(error) // Handle any errors with the request setup
);

export default axiosInstance; // Export the Axios instance
