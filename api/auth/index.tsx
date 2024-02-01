import { apiClient } from "../../src/api";

export const userLogin = async (data: any) => {
    const { email, password } = data
    const credential = btoa(email + ":" + password)
    const response = await apiClient.post(`/login`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${credential}`
        }
    })
    return response.data
};

export const loginSocial = async (data: any) => {
    const response = await apiClient.post(`/social-login`, data);
    return response.data;
};

export const logout = async () => {
    const response = await apiClient.post(`/logout`);
    return response.data;
};

export const register = async (data: any) => {
    const response = await apiClient.post(`/register`, data);
    return response.data;
};

export const changePassword = async (data: any) => {
    const response = await apiClient.post(`/change-password`, data);
    return response.data;
};
export const changeUserDetail = async (data: any) => {
    await apiClient.post(`/set-user`, data);
};

export const getUser = async () => {
    const response = await apiClient.get('/get-user');
    return response;
}

