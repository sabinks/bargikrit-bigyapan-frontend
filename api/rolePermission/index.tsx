import { apiClient } from "..";

export const getAssginPermission = async (id: number) => {
    const response = await apiClient.get(`/role-permission/${id}`);
    return response.data;
};
export const assinPermission = async (data: any) => {
    const response = await apiClient.post(`/assign-permission`, data);
    return response.data;
};
export const revokePermission = async (data: any) => {
    const response = await apiClient.post(`/revoke-permission`, data);
    return response.data;
};

export const setPermissionForRole = async (permission_id: number, role_id: number, checked: boolean) => {
    try {
        if (checked) {
            const response = await apiClient.post("/assign-permission", {
                role_id, permission_id
            })
            return response;
        } else {
            const response = await apiClient.post("/revoke-permission", {
                role_id, permission_id
            })
            return response;
        }
    } catch (error: any) {
        return error;
    }
};
