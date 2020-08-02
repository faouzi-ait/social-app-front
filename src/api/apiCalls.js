import axios from "axios";
import ApiClient from "./ApiClient";

const TOKEN =
  JSON.parse(localStorage.getItem("AIS_ADMIN_TOKEN")) || "NOT_LOGGED_IN";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/social-app-37d0e/us-central1/api",
});

axiosInstance.interceptors.request.use(
  (request) => request,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

const apiClient = new ApiClient(axiosInstance);
apiClient.setHeaders({ Authorization: `Bearer ${TOKEN}` });

export async function fetchScreems() {
  try {
    const response = await apiClient.get("/screems");
    return await response.data;
  } catch (error) {
    return { error };
  }
}

export async function authenticate(payload) {
  try {
    return await apiClient.post("/signin", payload);
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

export async function register(payload) {
  try {
    return await apiClient.post("/signup", payload);
  } catch (error) {
    return { error };
  }
}
