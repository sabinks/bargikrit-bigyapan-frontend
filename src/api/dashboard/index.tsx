import { apiClient } from "..";

export const getPartnerDocuments = async () => {
    const { data } = await apiClient.get('/partner-documents');
    return data;
}
export const deletePartnerDocument = async (documentName: string) => {
    await apiClient.delete(`/partner-documents/${documentName}`);
}
