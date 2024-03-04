import { apiClient } from "..";

export const getMembersDocuments = async () => {
    const { data } = await apiClient.get('/member-documents');
    return data;
}
export const deletePartnerDocument = async (documentName: string) => {
    await apiClient.delete(`/member-documents/${documentName}`);
}
export const getMembersDocumentsByUserId = async (query: any) => {
    const [name, id] = query?.queryKey
    const { data } = await apiClient.get(`/member-documents/${id}`)
    return data;
}
export const userFavouriteAds = async () => {
    return await apiClient.get('favourite-ads')
}
