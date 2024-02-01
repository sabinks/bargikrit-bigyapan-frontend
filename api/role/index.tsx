import { apiClient } from "../../src/api";

export const listRole = async () => {
    const response = await apiClient.get(`/role-list`);
    return response.data;
};
export const showRole = async (id: number) => {
    const response = await apiClient.get(`/role/${id}`);
    return response.data;
};

export const updateRole = async (data: any) => {
    const { state, id } = data
    const response = await apiClient.put(`/role/${id}`, state);
    return response.data;
};

export const addRole = async (data: any) => {
    const response = await apiClient.post(`/role`, data);
    return response.data;
};

export const deleteRole = async (id: number) => {
    const response = await apiClient.delete(`/role/${id}`);
    return response.data;
};