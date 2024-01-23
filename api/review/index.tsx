import { apiClient } from "..";

export const reviewAgent = async (data: any) => {
    const response = await apiClient.post(`agent-review`, data);
    return response.data;
};

export const reviewCompany = async (data: any) => {
    const response = await apiClient.post(`company-review`, data);
    return response.data;
};


export const agentReviewPublish = async (data: any) => {
    const { id, publish } = data
    const response = await apiClient.post(`agent-review/${id}/publish`, { publish });
    return response.data;
};


export const companyReviewPublish = async (data: any) => {
    const { id, publish } = data
    const response = await apiClient.post(`company-review/${id}/publish`, { publish });
    return response.data;
};


