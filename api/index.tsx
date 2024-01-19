import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

let headers: any = {
    "Content-Type": "application/json",
};

export const apiClient = axios.create({
    baseURL: baseUrl,
    headers: {
        ...headers,
    },
});

export const sendContact = async (data: {
    name: string;
    email: string;
    phone: string | number;
    subject: string;
    message: string;
}) => {
    const response = await apiClient.post(`/next/contact-form-send-mail`, data);
    return response;
};

export const AdvertisementList = async () => {
    const response = await apiClient.get(`/next/advertisements`);
    return response;
};
