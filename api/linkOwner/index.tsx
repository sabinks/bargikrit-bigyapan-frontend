import { apiClient } from "..";

export const linkOwner = async (data: any) => {
    const response = await apiClient.post(`/assign-owner-property`, data);
    return response.data;
};

export const removeOwner = async (data: any) => {
    const response = await apiClient.post(`/revoke-owner-property`, data);
    return response.data;
};