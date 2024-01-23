import { apiClient } from "..";

export const userBank = (data: any) => {
    return apiClient.post('user-bank', data)
}