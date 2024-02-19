import { apiClient } from "@/api";

export const getSubscriptionTypeList = async () => {
    const { data } = await apiClient.get('/subscription-type-list');
    return data;
}
export const getCurrentSubscription = async () => {
    const { data } = await apiClient.get('/current-subscription');
    return data;
}