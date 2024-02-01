import { apiClient } from "../../src/api";

export const listPermission = async () => {
    const response = await apiClient.get(`/permission`);
    return response.data;
};
export const showPermission = async (id: number) => {
    const response = await apiClient.get(`/permission/${id}`);
    return response.data;
};

export const updatePermission = async (data: any) => {
    const { state, id } = data
    const response = await apiClient.put(`/permission/${id}`, state);
    return response.data;
};

export const addPermission = async (data: any) => {
    const response = await apiClient.post(`/permission`, data);
    return response.data;
};

export const deletePermission = async (id: number) => {
    const response = await apiClient.delete(`/permission/${id}`);
    return response.data;
};