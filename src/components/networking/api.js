import axiosInstance from "./axiosInstance";
import { url } from "./url";
import axios from "axios";

// Create an Axios instance with base URL and headers
export const api = axios.create({
    baseURL: url, // Change to your IP address.
    headers: {
        "Content-Type": "application/json"
    }
});

export const socketUrl = "http://localhost:8085/ws";

// Interceptor to add authorization token to each request if available
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

// Function to load all challenges
export const loadChallenges = async () => {
    try {
        const response = await api.get("/challenge/all");
        return response.data;
    } catch (error) {
        console.error("Failed to load challenges", error);
        throw error;
    }
}

export const loadQuestions = async (challengeId) => {
    try {
        const response = await api.get(`/question/${challengeId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to load questions", error);
        throw error;
    }
}

// Function to load all users
export const getAllUsers = async () => {
    try {
        const response = await api.get("/users");
        return response.data;
    } catch (error) {
        console.error("Failed to load users", error);
        throw error;
    }
}

export const updateStudentScore = async (score) => {
    console.log("Localstorage item:", localStorage.getItem('user'));
    const userJSON = JSON.parse(localStorage.getItem('user'));
    console.log("User JSON username:", userJSON.username);
    try {
        const response = await api.patch("/student/score", null, {
            params: {
                username: userJSON.username,
                score: score
            }
        });
        console.log("Score updated:", response.data);
    } catch (error) {
        console.error("Failed to update student score", error.response.data);
    }
}

// Function to log in a user and store the token in local storage
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

// Function to log out a user and remove token and user details from local storage
export const logout = async () => {
    try {
        await api.post("/user/logout");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    } catch (error) {
        console.error("Logout failed", error);
        throw error;
    }
}

// Function to load user details by username
export const loadUserDetails = async (username) => {
    try {
        const response = await api.get(`/user/username/${username}`);
        return response.data;
    } catch (error) {
        console.error("Failed to load user details", error);
        throw error;
    }
}

// Function to sign up a student
export const signupStudent = async (studentData) => {
    try {
        const response = await axiosInstance.post('/user/student', studentData);
        return response.data;
    } catch (error) {
        console.error('Student signup failed:', error);
        throw error;
    }
};

// Function to sign up a host (teacher)
export const signupHost = async (hostData) => {
    try {
        const response = await axiosInstance.post('/user/teacher', hostData);
        return response.data;
    } catch (error) {
        console.error('Host signup failed:', error);
        throw error;
    }
};
