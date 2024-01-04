import axios from "axios";
import { backedApiUrl } from "./constants";

let headers: any = {
    "Content-Type": "application/json",
};

export const apiClient = axios.create({
    baseURL: backedApiUrl,
    headers: {
        ...headers,
    },
});

export const getWallpaperQuotes = async ({ page = 1, filter_by = '', query = '' }: any) => {
    return await apiClient.get(`/next-wallpaper-quotes?page=${page}&search=${query}&filter_by=${filter_by}`);
};

export const siteVisited = async (data: any) => {
    await apiClient.post(`/site-visit-count`, data);
};

