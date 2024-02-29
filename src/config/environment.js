export const STORE_URL = "http://127.0.0.1:8000";
export const BASE_URL = localStorage.getItem("end_point") ? JSON.parse(localStorage.getItem("end_point")) : STORE_URL;
export const API_URL = `${BASE_URL}/api/`;
export const IMAGE_URL = `${BASE_URL}/images`;
