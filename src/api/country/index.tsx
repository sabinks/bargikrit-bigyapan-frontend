import { apiClient } from "..";

export const addNewCountry = async (data: any) => {
    await apiClient.post('/countries', data);
}