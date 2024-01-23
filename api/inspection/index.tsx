import { apiClient } from "..";

export const addInspection = async (data: any) => {
    return await apiClient.post(`/inspection`, data);
};

export const changeConfirmationStatus = async (data: any) => {
    return await apiClient.post(`/confirm-status`, data);
};


export const updateInspection = async (data: any) => {
    return await apiClient.put(`/inspection/${data?.id}`, data);
};

export const inspectionBook = async (data: any) => {
    return await apiClient.post(`/book-inspection`, data);
};

export const userVisited = async (data: any) => {
    return await apiClient.post(`/user-reached`, data);
};
