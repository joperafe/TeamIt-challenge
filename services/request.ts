import axios from "axios";
import { API_URL } from "../config";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const request = async (url: string, options?: Object | undefined) => {
  try {
    const res = await api(url, options);
    return res.data;
  } catch (error) {
    return await Promise.reject(error?.response?.data?.message ?? "Error");
  }
};
