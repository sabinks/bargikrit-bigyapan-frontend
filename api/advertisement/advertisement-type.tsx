import { apiClient } from "..";

export const addAdvertisementType = async (data: any) => {
    return await apiClient.post(`/advertisement-type`, data, {
    });
};
export const updateAdvertisementType = async (state: any) => {
    const { id, name } = state
    return await apiClient.put(`/advertisements/${id}`, {
        name
    });
};