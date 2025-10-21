import api from "@/common/axios";

export default async function loadDocuments(category:string) {
   return await api.get(`/documents?category=${category!="-1"?category:''}`)
}