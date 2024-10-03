import axios from "axios";
export const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/clone2024-f6a21/us-central1/api",

  // deployed version of amazon server on render.com
  baseURL: "https://amazon-api-deploy-oc6n.onrender.com/",
});

export default axiosInstance; // This would cause a conflict
