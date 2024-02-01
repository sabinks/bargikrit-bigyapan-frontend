import { apiClient } from "../../src/api";

export const userFavirote = async (data: any) => {
    return await apiClient.post(`/user-favorite`, data);
};

export const removeUserFavirote = async (id: number) => {
    return await apiClient.delete(`/user-favorite/${id}`);
};


export const listUserFavirote = async () => {
    return await apiClient.get(`/user-favorite`);
};


export const faviroteIdList = async () => {
    return await apiClient.get(`/user-favorite-list`);
};

