import { apiClient } from "..";

export const assignPropertyCompany = async (data: any) => {
    const response = await apiClient.post(`/assign-property-company`, data);
    return response.data;
};


export const assignPropertyAgent = async (data: any) => {
    const response = await apiClient.post(`/assign-property-agent`, data);
    return response.data;
};



export const removePropertyAgent = async (data: any) => {
    const response = await apiClient.post(`/remove-property-agent`, data);
    return response.data;
};

export const removePropertyCompany = async (data: any) => {
    const response = await apiClient.post(`/remove-property-company`, data);
    return response.data;
};