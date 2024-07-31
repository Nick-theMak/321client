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

export const loadChallenges = async () => {
    try {
        const response = await api.get("/challenge/all");
        return response.data;
    } catch (error) {
        console.error("Failed to load challenges", error);
        throw error;
    }
}

export const getAllUsers = async () => {
    try {
        const response = await api.get("/users");
        return response.data;
    } catch (error) {
        console.error("Failed to load users", error);
        throw error;
    }
}

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

export const logout = async () => {
    try {
        await api.post("/user/logout")
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    } catch (error) {
        console.error("Logout failed", error);
        throw error;
    }
}

export const loadUserDetails = async (username) => {
    try {
        const response = await api.get(`/user/username/${username}`);
        // console.log("User details:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to load user details", error);
        throw error;
    }
}

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