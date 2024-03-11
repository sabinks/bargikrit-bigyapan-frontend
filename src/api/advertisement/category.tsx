import { apiClient } from "..";

export const getCategories = async () => {
    const response = await apiClient.get(`/categories`);
    return response.data;
}
export const addCategory = async (data: any) => {
    return await apiClient.post(`/categories`, data, {
    });
};
export const updateCategory = async (state: any) => {
    const { id, name } = state
    return await apiClient.put(`/categories/${id}`, {
        name
    });
};