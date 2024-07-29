import axiosInstance from "./axiosInstance";
import { url } from "./url";
import axios from "axios";

export const api = axios.create({
    baseURL: url, // Change to your IP address.
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export const login = async (username, password) => {
    try {
        const response = await axiosInstance.post("/user/login", { username, password });
        const token = response.data.token;
        localStorage.setItem("token", token);
        return response.data;
    } catch (error) {
        console.error("Login failed", error);
        throw error;
    }
};


export const signupStudent = async (studentData) => {
    try {
        const response = await axiosInstance.post('/user/student', studentData);
        return response.data;
    } catch (error) {
        console.error('Student signup failed:', error);
        throw error;
    }
};


export const signupHost = async (hostData) => {
    try {
        const response = await axiosInstance.post('/user/teacher', hostData);
        return response.data;
    } catch (error) {
        console.error('Host signup failed:', error);
        throw error;
    }
};