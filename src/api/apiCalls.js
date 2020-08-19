import axios from "axios";
import ApiClient from "./ApiClient";
import { TOKEN } from "../js/jsUtils";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/social-app-37d0e/us-central1/api",
  baseURL: "https://europe-west1-social-app-37d0e.cloudfunctions.net/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    // CHECK FOR TOKEN EXPIRY HERE, REDIRECT TO HOME PAGE IF EXPIRED
    if (TOKEN) {
      config.headers["Authorization"] = `Bearer ${TOKEN}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

const apiClient = new ApiClient(axiosInstance);

export async function authenticate(payload) {
  try {
    return await apiClient.post("/signin", payload);
  } catch (error) {
    return { error };
  }
}

export async function fetch_user_profile() {
  try {
    return await apiClient.get("/profile");
  } catch (error) {
    return { error };
  }
}

export async function register(payload) {
  try {
    return await apiClient.post("/signup", payload);
  } catch (error) {
    return { error };
  }
}

export async function fetchScreems() {
  try {
    const response = await apiClient.get("/screems");
    return await response.data;
  } catch (error) {
    return { error };
  }
}

export async function uploadPicture(payload) {
  try {
    const response = await apiClient.post("/upload", payload);
    return await response.data;
  } catch (error) {
    return { error };
  }
}

export async function profileUpdate(payload) {
  try {
    const response = await apiClient.post("/profile", payload);
    return await response.data;
  } catch (error) {
    return { error };
  }
}

export async function likeScreemCall(id) {
  try {
    const response = await apiClient.get(`/screem/${id}/like`);
    return await response.data;
  } catch (error) {
    return { error };
  }
}

export async function unlikeScreemCall(id) {
  try {
    const response = await apiClient.get(`/screem/${id}/unlike`);
    return await response.data;
  } catch (error) {
    return { error };
  }
}

export async function deleteScreemCall({ id }) {
  try {
    const response = await apiClient.delete(`/screem/${id}/delete`);
    return await response.data;
  } catch (error) {
    return { error };
  }
}

export async function submitScreem(payload) {
  try {
    const response = await apiClient.post(`/screems`, payload);
    return await response.data;
  } catch (error) {
    return { error };
  }
}

export async function getScreemDetails({ id }) {
  try {
    const response = await apiClient.get(`/screem/${id}`);
    return await response.data;
  } catch (error) {
    return { error };
  }
}

export async function postCommentCall(id, payload) {
  try {
    const response = await apiClient.post(`/screem/${id}/comment`, payload);
    return await response.data;
  } catch (error) {
    return { error };
  }
}

export async function logout() {
  try {
    return await apiClient.get("/signout");
  } catch (error) {
    return { error };
  }
}
