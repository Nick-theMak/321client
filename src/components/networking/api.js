import axiosInstance from "./axiosInstance";
import { url } from "./url";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);

    const currentTime = Math.floor(Date.now() / 1000);

    return decodedToken.exp < currentTime;
  } catch (error) {
    console.log("Error decoding token: ", error);
    return true;
  }
}

// Create an Axios instance with base URL and headers
export const api = axios.create({
  baseURL: url, // Change to your IP address.
  headers: {
    "Content-Type": "application/json"
  }
});

export const apiNoToken = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json"
  }
})

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
    const response = await apiNoToken.get(`/user/username/${username}`);
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



// API call to load open challenges (boilerplate)
export const loadOpenChallenges = async () => {
  try {
    // Placeholder for the actual API call
    // The real endpoint might look like '/challenges/open'
    const response = await api.get('/challenge/open');
    return response.data; // Assuming the API returns a list of challenges
  } catch (error) {
    console.error('Failed to load open challenges:', error);
    throw error;
  }
};

// API call to load user team points and ranking (boilerplate)
export const getUserTeamPointsAndRanking = async (username) => {
  try {
    // Placeholder for the actual API call
    // The real endpoint might look like `/user/${username}/team-points-ranking`
    const response = await api.get(`/user/${username}/team-points-ranking`);
    return response.data; // Assuming the API returns an object with teamPoints and ranking
  } catch (error) {
    console.error('Failed to fetch team points and ranking:', error);
    throw error;
  }
};



// Fetch teams
export const getTeams = async () => {
  try {
    const response = await axiosInstance.get('/team/all');
    return response.data;
  } catch (error) {
    throw error;
  }
};





// Competition-related API
export const createCompetition = async (maxTeams, maxTeamSize) => {
  console.log(maxTeams, maxTeamSize);
  try {
    const response = await axiosInstance.post('/competition/create', null, {
      params: {
        maxTeams: parseInt(maxTeams),
        maxTeamSize: parseInt(maxTeamSize),
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};

// Team-related API
export const createTeam = async (competitionId, teamName) => {
  try {
    const response = await axiosInstance.post(`/team/create?competitionId=${competitionId}`, {
      teamName,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};

export const addTeamMember = async (teamPassword, studentUsername) => {
  try {
    const response = await axiosInstance.post(`/team/addMember`, null, {
      params: {
        teamPassword,
        studentUsername,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};

export const removeTeamMember = async (teamName, studentUsername) => {
  try {
    const response = await axiosInstance.delete(`/team/removeMember`, {
      params: {
        teamName,
        studentUsername,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};

// Challenge-related API
export const createChallenge = async (competitionId, name, description, difficulty, points) => {
  try {
    const response = await axiosInstance.post(`/challenge/new`, {
      competitionId,
      name,
      description,
      difficulty,
      points,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};

// Question-related API
export const addQuestion = async (challengeId, questionText, options, correctOption, points) => {
  try {
    const response = await axiosInstance.post(`/question/new?challengeId=${challengeId}`, {
      questionText,
      options,
      correctOption,
      points,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};

// Live room monitoring
export const fetchLiveScores = async (competitionId) => {
  try {
    const response = await axiosInstance.get(`/competition/${competitionId}/scores`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};

export const fetchTeams = async (competitionId) => {
  try {
    const response = await axiosInstance.get(`/competition/${competitionId}/teams`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};

// Get all competitions (adjust the endpoint if necessary)
export const getAllCompetitions = async () => {
  try {
    const response = await axiosInstance.get('/competition/all');
    return response.data; // Assuming response contains an array of competitions
  } catch (error) {
    console.error('Failed to fetch competitions:', error);
    throw error;
  }
};


// End the competition
export const endCompetition = async (competitionCode) => {
  try {
    const response = await axiosInstance.post(`/competition/${competitionCode}/end`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// API to join a competition
export const joinCompetition = async (competitionCode) => {
  try {
    const response = await axiosInstance.post(`/competition/${competitionCode}/join`);
    return response.data;  // Assuming it returns success or error
  } catch (error) {
    throw error;
  }
};

// API to fetch competition details
export const fetchCompetitionDetails = async (competitionCode) => {
  try {
    const response = await axiosInstance.get(`/competition/${competitionCode}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch room details by roomId
export const fetchRoomDetails = async (roomId) => {
  try {
    const response = await api.get(`/room/${roomId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch room details", error);
    throw error;
  }
};

export const fetchAllRooms = async () => {
  try {
    const response = await api.get(`/room/all`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch rooms", error);
    throw error;
  }
}

// Fetch questions for a room by roomId
export const fetchRoomQuestions = async (roomId) => {
  try {
    const response = await api.get(`/room/${roomId}/questions`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch room questions", error);
    throw error;
  }
};


