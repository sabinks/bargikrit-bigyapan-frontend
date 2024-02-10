import { apiClient } from "..";

export const getPartnerDocuments = async () => {
    const { data } = await apiClient.get('/partner-documents');
    return data;
}
export const deletePartnerDocument = async (documentName: string) => {
    await apiClient.delete(`/partner-documents/${documentName}`);
}
export const getPartnerDocumentsByUserId = async (query: any) => {
    const [name, id] = query?.queryKey
    const { data } = await apiClient.get(`/partner-documents/${id}`)
    return data;
}
export const userFavouriteAds = async () => {
    return await apiClient.get('favourite-ads')
}
